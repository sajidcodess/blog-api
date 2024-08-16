const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

beforeEach(async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/blog/create", () => {
  it("Should Create A Post", async () => {
    const res = await request(app)
      .post("/api/blog/create")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmY0MTE0YWQ3N2ZiOGYzYzM0MmYyYiIsImlhdCI6MTcyMzg0NDYwNywiZXhwIjoxNzIzOTMxMDA3fQ._6YvfCMGGG-7pE0xUo84JO3bQc2KXsx0Pj48H7P3lf8",
      )
      .send({
        title: "string title goes here",
        auther: "Auther name goes here",
        content: "content goes here",
        tags: ["one", "two", "three"],
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("success", true);
  });
});
