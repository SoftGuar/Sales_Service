import { productModel } from "../models/productModel";

// Mock the entire prismaService module
jest.mock("../services/prismaService", () => ({
  __esModule: true, // This is important for ES module compatibility
  default: {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
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

    it("should return an empty array and log an error when Prisma query fails", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      (prismaService.product.findMany as jest.Mock).mockRejectedValue(new Error("Database error"));

      const result = await productModel.getAllProducts();

      expect(result).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to get products:", expect.any(Error));

      consoleErrorSpy.mockRestore();
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

    it("should return null and log an error when Prisma query fails", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      (prismaService.product.findUnique as jest.Mock).mockRejectedValue(new Error("Database error"));

      const result = await productModel.getProductById(1);

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to get product:", expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });

  describe("createProduct", () => {
    it("should create and return a product when prisma query succeeds", async () => {
      const newProduct = { name: "Product 1", description: "Desc 1", price: 100 };
      const createdProduct = { id: 1, ...newProduct };

      (prismaService.product.create as jest.Mock).mockResolvedValueOnce(createdProduct);

      const result = await productModel.createProduct(newProduct);

      expect(prismaService.product.create).toHaveBeenCalledWith({
        data: newProduct,
      });
      expect(result).toEqual(createdProduct);
    });

    it("should return null and log an error when Prisma query fails", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      const newProduct = { name: "Product 1", description: "Desc 1", price: 100 };

      (prismaService.product.create as jest.Mock).mockRejectedValue(new Error("Database error"));

      const result = await productModel.createProduct(newProduct);

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to create product:", expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });

  describe("updateProduct", () => {
    it("should update and return a product when prisma query succeeds", async () => {
      const updatedProduct = { name: "Updated Product", price: 150 };
      const mockUpdatedProduct = { id: 1, ...updatedProduct };

      (prismaService.product.update as jest.Mock).mockResolvedValue(mockUpdatedProduct);

      const result = await productModel.updateProduct(1, updatedProduct);

      expect(prismaService.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updatedProduct,
      });
      expect(result).toEqual(mockUpdatedProduct);
    });

    it("should return null and log an error when Prisma query fails", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      const updatedProduct = { name: "Updated Product", price: 150 };

      (prismaService.product.update as jest.Mock).mockRejectedValue(new Error("Database error"));

      const result = await productModel.updateProduct(1, updatedProduct);

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to update product:", expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });

  describe("deleteProduct", () => {
    it("should delete and return a product when prisma query succeeds", async () => {
      const mockDeletedProduct = { id: 1, name: "Product 1", description: "Desc 1", price: 100 };

      (prismaService.product.delete as jest.Mock).mockResolvedValue(mockDeletedProduct);

      const result = await productModel.deleteProduct(1);

      expect(prismaService.product.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockDeletedProduct);
    });

    it("should return null and log an error when Prisma query fails", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      (prismaService.product.delete as jest.Mock).mockRejectedValue(new Error("Database error"));

      const result = await productModel.deleteProduct(1);

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to delete product:", expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });
});