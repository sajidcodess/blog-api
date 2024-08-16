const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

// Connecting to database before each test
beforeEach(async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
});

// Closing database conenction after each test
afterEach(async () => {
  await mongoose.connection.close();
});

const data = {
  username: "emaar",
  email: process.env.MY_EMAIL,
  password: "123456",
};

describe("POST /api/auth/register", () => {
  it("Should not register if user already exist", async () => {
    const res = await request(app).post("/api/auth/register").send(data);
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("success", false);
  });
});

describe("POST /api/auth/login", () => {
  it("should login if the user exists", async () => {
    const res = await request(app).post("/api/auth/login").send(data);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
