// __tests__/controllers/authController.test.js
const { registerUser } = require("../../controllers/authController");
import pool from "../../db/pool";
import bcrypt from "bcryptjs;"
// 🧩 Mock dependencies
jest.mock("../../db/pool", () => ({ query: jest.fn() }));
jest.mock("bcryptjs");
jest.mock("crypto");

describe("authController.registerUser", () => {
  it("should insert user and return success", async () => {
    // Arrange
    const hashedPassword = "hashed12345";
    const randomId = 1234567890;

    bcrypt.hash.mockResolvedValue(hashedPassword);
    crypto.randomInt.mockReturnValue(randomId);
    pool.query
      .mockResolvedValueOnce({ rows: [] }) // user check
      .mockResolvedValueOnce({}); // insert user

    const req = {
      body: { username: "testuser", email: "test@example.com", password: "12345" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Act
    await registerUser(req, res);

    // Assert
    expect(pool.query).toHaveBeenNthCalledWith(
      1,
      "SELECT 1 FROM users WHERE email = $1",
      ["test@example.com"]
    );

    expect(pool.query).toHaveBeenNthCalledWith(
      2,
      `INSERT INTO users (user_id, username, email, password, created_at)
       VALUES ($1, $2, $3, $4, NOW()::timestamp without time zone)`,
      [randomId, "testuser", "test@example.com", hashedPassword]
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
      user_id: randomId,
    });
  });
});
