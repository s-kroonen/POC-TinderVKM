import { describe, it, expect, jest } from "@jest/globals";
import { ClassController } from "../../src/presentation/controllers/class.controller";
import { Request, Response } from "express";

function mockResponse() {
  const res = {} as Partial<Response>;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
}

describe("ClassController", () => {
  it("returns 500 on error in getAll", async () => {
    const mockService = { getAll: jest.fn().mockRejectedValue(new Error("fail")) };
    const controller = new ClassController(mockService as any);
    const res = mockResponse();
    await controller.getAll({} as Request, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("returns class when found", async () => {
    const item = { id: 3, name: "C" };
    const mockService = { getByIdNumber: jest.fn().mockResolvedValue(item) };
    const controller = new ClassController({} as any);
    (controller as any).classService = mockService; // hacky injection
    const res = mockResponse();
    const req = { params: { id: "3" } } as unknown as Request;
    await controller.getById(req, res);
    expect(res.json).toHaveBeenCalledWith(item);
  });
});
