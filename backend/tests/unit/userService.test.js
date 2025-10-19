import { describe, it, expect, jest } from "@jest/globals";
import { UserService } from "../../src/services/userService";
describe("UserService", () => {
    const mockRepo = {
        create: jest.fn(),
        findByEmail: jest.fn(),
        findById: jest.fn(),
        save: jest.fn(),
    };
    const service = new UserService(mockRepo);
    it("calls repository.create with hashed password on register", async () => {
        mockRepo.create.mockResolvedValue({ _id: "1", email: "a@b.com", password: "hashedpw" });
        const result = await service.register("a@b.com", "plainpw");
        expect(mockRepo.create).toHaveBeenCalled();
        expect(result.email).toBe("a@b.com");
    });
    it("finds a user by email", async () => {
        mockRepo.findByEmail.mockResolvedValue({ email: "user@test.com" });
        const user = await service.findByEmail("user@test.com");
        expect(user?.email).toBe("user@test.com");
    });
    it("saves the user via repo.save", async () => {
        const user = { _id: "1", email: "x@y.com", liked: [], skipped: [] };
        mockRepo.save.mockResolvedValue(user);
        const result = await service.save(user);
        expect(mockRepo.save).toHaveBeenCalledWith(user);
        expect(result).toEqual(user);
    });
});
