import dispositiveModel from "../models/dispositiveModel";

// Mock the entire prismaService module
jest.mock("../services/prismaService", () => {
  return {
    __esModule: true, // This is important for ES module compatibility
    default: {
      dispositive: {
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

  describe("findAvailableDispositive", () => {
    it("should return the first available dispositive when prisma query succeeds", async () => {
      const mockDispositive = { id: 1, product_id: 123, user_id: null };

      (prismaService.dispositive.findFirst as jest.Mock).mockResolvedValue(
        mockDispositive
      );

      const result = await dispositiveModel.findAvailableDispositive(123);

      expect(prismaService.dispositive.findFirst).toHaveBeenCalledWith({
        where: { product_id: 123, user_id: NaN },
      });
      expect(result).toEqual(mockDispositive);
    });

    it("should throw an error when prisma query fails", async () => {
      const mockError = new Error("Database error");

      (prismaService.dispositive.findFirst as jest.Mock).mockRejectedValue(
        mockError
      );

      await expect(
        dispositiveModel.findAvailableDispositive(123)
      ).rejects.toThrow("An error occurred while retrieving the dispositive: Database error");

      expect(prismaService.dispositive.findFirst).toHaveBeenCalledWith({
        where: { product_id: 123, user_id: NaN },
      });
    });
  });
});
