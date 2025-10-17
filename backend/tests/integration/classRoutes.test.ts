import request from "supertest";
import { describe, it, expect } from "@jest/globals";
let app: any;

beforeAll(async () => {
  // dynamically import app after MongoMemoryServer URI is set
  const module = await import("../../src/app");
  app = module.default; // or module.createApp() if you export a function
});

describe("Class Routes", () => {
  it("returns list of classes", async () => {
    const resp = await request(app).get("/api/classes");
    expect(resp.status).toBe(200);
    expect(Array.isArray(resp.body)).toBe(true);
  });

  it("returns 404 for nonexistent class", async () => {
    const resp = await request(app).get("/api/classes/9999");
    expect(resp.status).toBe(404);
  });
});
