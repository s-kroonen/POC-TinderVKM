import { describe, it, expect, jest } from "@jest/globals";
import { ClassService } from "../../src/services/classService";
import { IClassRepository } from "../../src/repositories/IClassRepository";

describe("ClassService", () => {
  const mockRepo: jest.Mocked<IClassRepository> = {
    findAll: jest.fn(),
    findByIdNumber: jest.fn(),
    findByObjectId: jest.fn(),
  };

  const service = new ClassService(mockRepo);

  it("returns all classes via findAll", async () => {
    const arr = [{ id: 1, name: "A" }] as any;
    mockRepo.findAll.mockResolvedValue(arr);
    const result = await service.getAll();
    expect(result).toBe(arr);
  });

  it("returns class by id number", async () => {
    const cls = { id: 2, name: "B" } as any;
    mockRepo.findByIdNumber.mockResolvedValue(cls);
    const result = await service.getByIdNumber(2);
    expect(result).toEqual(cls);
  });
});
