import { productModel } from "../models/productModel";

// Mock the entire prismaService module
jest.mock("../services/prismaService", () => ({
  __esModule: true, // This is important for ES module compatibility
  default: {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));
// Import the mocked module
import prismaService from "../services/prismaService";

describe("productModel", () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllProducts", () => {
    it("should return an array of products when prisma query succeeds", async () => {
      const mockProducts = [
        { id: 1, name: "Product 1", description: "Desc 1", price: 100 },
        { id: 2, name: "Product 2", description: "Desc 2", price: 200 },
      ];

      (prismaService.product.findMany as jest.Mock).mockResolvedValueOnce(mockProducts);

      const result = await productModel.getAllProducts();

      expect(prismaService.product.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProducts);
    });

    it("should throw an error when Prisma query fails", async () => {
      (prismaService.product.findMany as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(productModel.getAllProducts()).rejects.toThrow("Failed to get products: Database error");
    });
  });

  describe("getProductById", () => {
    it("should return a product when prisma query succeeds", async () => {
      const mockProduct = { id: 1, name: "Product 1", description: "Desc 1", price: 100 };

      (prismaService.product.findUnique as jest.Mock).mockResolvedValueOnce(mockProduct);

      const result = await productModel.getProductById(1);

      expect(prismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockProduct);
    });

    it("should throw an error when Prisma query fails", async () => {
      (prismaService.product.findUnique as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(productModel.getProductById(1)).rejects.toThrow("Failed to get product with ID 1: Database error");
    });
  });
});
