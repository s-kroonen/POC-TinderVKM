import request from "supertest";
import { describe, it, expect, beforeAll } from "@jest/globals";

let app: any;

beforeAll(async () => {
  // dynamically import app after MongoMemoryServer URI is set
  const module = await import("../../src/app");
  app = module.default; // or module.createApp() if you export a function
});

describe("Auth Routes", () => {
  it("registers and logs in", async () => {
    const resp = await request(app)
      .post("/api/auth/register")
      .send({ email: "int@test.com", password: "abcdef" });
    expect(resp.status).toBe(201);

    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "int@test.com", password: "abcdef" });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  });

  it("rejects login for wrong credentials", async () => {
    const resp = await request(app)
      .post("/api/auth/login")
      .send({ email: "int@test.com", password: "wrongpw" });
    expect(resp.status).toBe(401);
  });
});
