import dispositiveModel from "../models/dispositiveModel";

// Mock the entire prismaService module
jest.mock("../services/prismaService", () => {
  return {
    __esModule: true, // This is important for ES module compatibility
    default: {
      dispositive: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    },
  };
});

// Import the mocked module
import prismaService from "../services/prismaService";

describe("dispositiveModel", () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllDispositives", () => {
    it("should return an array of dispositives when prisma query succeeds", async () => {
      const mockDispositives = [
        { id: 1, name: "Dispositive 1" },
        { id: 2, name: "Dispositive 2" },
      ];

      (prismaService.dispositive.findMany as jest.Mock).mockResolvedValue(
        mockDispositives
      );

      const result = await dispositiveModel.getAllDispositives();

      expect(prismaService.dispositive.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockDispositives);
    });

    test("getAllDispositives should return an empty array and log an error when Prisma query fails", async () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
      
        (prismaService.dispositive.findMany as jest.Mock).mockRejectedValue(new Error("Database error"));
      
        const result = await dispositiveModel.getAllDispositives();
      
        expect(result).toEqual([]); // Ensure it returns an empty array
        expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to get dispositives:", expect.any(Error)); // Fix expected message
      
        consoleErrorSpy.mockRestore();
      });
      
  });

  describe("findAvailableDispositive", () => {
    it("should return the first available dispositive when prisma query succeeds", async () => {
      const mockDispositive = { id: 1, product_id: 123, user_id: NaN };

      (prismaService.dispositive.findFirst as jest.Mock).mockResolvedValue(
        mockDispositive
      );

      const result = await dispositiveModel.findAvailableDispositive(123);

      expect(prismaService.dispositive.findFirst).toHaveBeenCalledWith({
        where: { product_id: 123, user_id: NaN },
      });
      expect(result).toEqual(mockDispositive);
    });
  });
});
