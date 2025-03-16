import { UserModel } from "../models/userModel";
// Mock the entire prismaService module
jest.mock("../services/prismaService", () => ({
  __esModule: true, // This is important for ES module compatibility
  default: {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));
import prismaService from "../services/prismaService";

describe("UserModel", () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findById", () => {
    it("should return a user when prisma query succeeds", async () => {
      const mockUser = {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
      };

      (prismaService.user.findUnique as jest.Mock).mockResolvedValueOnce(
        mockUser
      );

      const result = await UserModel.findById(1);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockUser);
    });

    it("should return null and log an error when user is not found", async () => {
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      (prismaService.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

      const result = await UserModel.findById(1);

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error finding user by ID:",
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it("should return null and log an error when Prisma query fails", async () => {
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      (prismaService.user.findUnique as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const result = await UserModel.findById(1);

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error finding user by ID:",
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe("getAll", () => {
    it("should return an array of users when prisma query succeeds", async () => {
      const mockUsers = [
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com",
        },
        {
          id: 2,
          first_name: "Jane",
          last_name: "Smith",
          email: "jane.smith@example.com",
        },
      ];

      (prismaService.user.findMany as jest.Mock).mockResolvedValueOnce(
        mockUsers
      );

      const result = await UserModel.getAll();

      expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUsers);
    });

    it("should return an empty array and log an error when no users are found", async () => {
      (prismaService.user.findMany as jest.Mock).mockResolvedValueOnce([]);

      const result = await UserModel.getAll();

      expect(result).toEqual([]);
    });

    it("should return an empty array and log an error when Prisma query fails", async () => {
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      (prismaService.user.findMany as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const result = await UserModel.getAll();

      expect(result).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error getting all users:",
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
