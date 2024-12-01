import request from "supertest";
import app from "../../index.js";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

describe("User Routes", () => {
  test("should fetch user by id", async () => {
    const res = await request(app).get("/user/getUser");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  test("should return 404 if user not found", async () => {
    const res = await request(app).get("/user/getUser/9999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "User not found");
  });
});
