const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

beforeEach(async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/blogs/create", () => {
  it("Should Create A Post", async () => {
    const res = await request(app)
      .post("/api/blogs/create")
      .set("Authorization", `Bearer ${process.env.MY_JWT}`)
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

describe("GET /api/blogs", () => {
  it("Should get all the blogs", async () => {
    const res = await request(app).get("/api/blogs")
    expect(res.statusCode).toBe(200)
  })
})
