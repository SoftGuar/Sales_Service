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

    

    

    
  });
});