import { productService } from "../services/productService";

// Mock the productModel module
jest.mock("../models/productModel");
import { productModel } from "../models/productModel";

describe("productService", () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllProducts", () => {
    it("should return an array of products when the database call succeeds", async () => {
      // Arrange
      const mockProducts = [
        { id: 1, name: "Product A", price: 100 },
        { id: 2, name: "Product B", price: 200 },
      ];
      (productModel.getAllProducts as jest.Mock).mockResolvedValue(
        mockProducts
      );

      // Act
      const result = await productService.getAllProducts();

      // Assert
      expect(productModel.getAllProducts).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });

    it("should throw an error when the database call fails", async () => {
      // Arrange
      const mockError = new Error("Database error");
      (productModel.getAllProducts as jest.Mock).mockRejectedValue(mockError);

      // Act & Assert
      await expect(productService.getAllProducts()).rejects.toThrow(
        "Error retrieving all products: Database error"
      );
      expect(productModel.getAllProducts).toHaveBeenCalled();
    });
  });

  describe("getProductById", () => {
    it("should return a product when the database call succeeds", async () => {
      // Arrange
      const mockProduct = { id: 1, name: "Product A", price: 100 };
      (productModel.getProductById as jest.Mock).mockResolvedValue(mockProduct);

      // Act
      const result = await productService.getProductById(1);

      // Assert
      expect(productModel.getProductById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });

    it("should throw an error when no product is found", async () => {
      // Arrange
      (productModel.getProductById as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(productService.getProductById(1)).rejects.toThrow(
        "Product with ID 1 not found."
      );
      expect(productModel.getProductById).toHaveBeenCalledWith(1);
    });

    it("should throw an error when an invalid ID is provided", async () => {
      // Act & Assert
      await expect(productService.getProductById(null as any)).rejects.toThrow(
        "Invalid product ID provided."
      );
      await expect(productService.getProductById("abc" as any)).rejects.toThrow(
        "Invalid product ID provided."
      );
    });

    it("should throw an error when the database call fails", async () => {
      // Arrange
      const mockError = new Error("Database error");
      (productModel.getProductById as jest.Mock).mockRejectedValue(mockError);

      // Act & Assert
      await expect(productService.getProductById(1)).rejects.toThrow(
        "Error retrieving product with ID 1: Database error"
      );
      expect(productModel.getProductById).toHaveBeenCalledWith(1);
    });
  });
});