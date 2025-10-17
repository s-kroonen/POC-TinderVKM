import { describe, it, expect, jest } from "@jest/globals";
import { AuthController } from "../../src/presentation/controllers/auth.controller";
import { Request, Response } from "express";
import { UserService } from "../../src/services/userService";

function mockResponse() {
  const res = {} as Partial<Response>;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
}

describe("AuthController", () => {
  it("returns 400 for invalid email", async () => {
    const service = {} as UserService;
    const controller = new AuthController(service);
    const req = { body: { email: "notanemail", password: "123456" } } as Request;
    const res = mockResponse();
    await controller.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("delegates to service when valid input", async () => {
    const mockService = {
      findByEmail: jest.fn().mockResolvedValue(null),
      register: jest.fn().mockResolvedValue({ _id: "1", email: "u@test.com" }),
    } as unknown as UserService;

    const controller = new AuthController(mockService);
    const req = { body: { email: "u@test.com", password: "abcdef" } } as Request;
    const res = mockResponse();

    await controller.register(req, res);
    expect(mockService.register).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
