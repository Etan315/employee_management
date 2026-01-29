// __tests__/employeeController.test.js
const { addEmployee } = require("../../controllers/addEmployee");
import pool from "../db/pool.js";

jest.mock("../../db/pool", () => {
  const mockPool = {
    connect: jest.fn(),
  };
  return mockPool;
});
jest.mock("crypto");

describe("addEmployee", () => {
  let req, res, client;

  beforeEach(() => {
    req = {
      body: {
        username: "john",
        email: "john@example.com",
        password: "123456",
        role: "employee",
        first_name: "John",
        middle_name: "D",
        last_name: "Doe",
        year: "1990",
        month: "05",
        day: "20",
        gender: "Male",
        phone_number: "1234567890",
        department_id: 1,
        position_id: 2,
        manager_id: 30,
        joined_year: "2023",
        joined_month: "01",
        joined_day: "15",
        employment_status: "Active",
        municipality: "SanJulian",
        city: "Borongan",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    client = {
      query: jest.fn(),
      release: jest.fn(),
    };

    pool.connect.mockResolvedValue(client);
    crypto.randomInt.mockReturnValue(1234567890);
  });

  afterEach(() => jest.clearAllMocks());

  it("should successfully insert user and employee", async () => {
    client.query
      .mockResolvedValueOnce({}) // BEGIN
      .mockResolvedValueOnce({ rows: [{ user_id: 1234567890 }] }) // user insert
      .mockResolvedValueOnce({ rows: [{ emp_id: 1234567890 }] }) // employee insert
      .mockResolvedValueOnce({}); // COMMIT

    await addEmployee(req, res);

    // Check BEGIN call
    expect(client.query.mock.calls[0][0]).toBe("BEGIN");

    // Check INSERT INTO users call
    expect(client.query.mock.calls[1][0]).toContain("INSERT INTO users");
    expect(client.query.mock.calls[1][1]).toEqual([
      1234567890,
      "john",
      "john@example.com",
      "123456",
      "employee",
      expect.any(String),
    ]);

    // Check INSERT INTO employees call
    expect(client.query.mock.calls[2][0]).toContain("INSERT INTO employees");
    expect(client.query.mock.calls[2][1]).toEqual([
      1234567890,
      "John",
      "D",
      "Doe",
      "1990-05-20",
      "Male",
      "1234567890",
      1,
      2,
      30,
      "2023-01-15",
      "Active",
      1234567890,
      "SanJulian",
      "Borongan",
    ]);

    // Check COMMIT call
    expect(client.query.mock.calls[3][0]).toBe("COMMIT");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Employee and user added successfully",
      })
    );
    expect(client.release).toHaveBeenCalled();
  });

  it("should handle error and rollback transaction", async () => {
    client.query
      .mockResolvedValueOnce({}) // BEGIN
      .mockRejectedValueOnce(new Error("DB error")); // fail on user insert

    await addEmployee(req, res);

    expect(client.query).toHaveBeenCalledWith("ROLLBACK");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Server error, transaction failed" })
    );
    expect(client.release).toHaveBeenCalled();
  });
});
