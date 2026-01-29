const { addEvent } = require("../../controllers/addEvent");
import pool from "../db/pool.js";

jest.mock("../../db/pool", () => ({
  query: jest.fn(),
}));

jest.mock("crypto", () => ({
  randomInt: jest.fn(),
}));

describe("add event controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        title: "Sample Event",
        description: "Event Description",
        city: "Sample City",
        municipality: "Sample Municipality",
        participantsId: "12345",
        year: "2025",
        month: "11",
        day: "12",
      },
      file: null,
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  test("should add an event successfully", async () => {
    const fakeEventId = 1234567890;
    crypto.randomInt.mockReturnValue(fakeEventId);
    pool.query.mockResolvedValue({ rows: [] });

    await addEvent(req, res);

    const expectedDate = "2025-11-12";

    expect(crypto.randomInt).toHaveBeenCalledWith(1000000000, 9999999999);

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO events"),
      [
        fakeEventId,
        "Sample Event",
        "Event Description",
        "Sample City",
        "Sample Municipality",
        "12345",  
        expectedDate,
        null,
      ]
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Event added successfully",
      event_id: fakeEventId,
    });
  });

  test("should handle database errors", async () => {
    crypto.randomInt.mockReturnValue(9876543210);
    pool.query.mockRejectedValue(new Error("DB error"));

    await addEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to add event",
    });
  });
});
