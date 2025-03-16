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
            (productModel.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);

            // Act
            const result = await productService.getAllProducts();

            // Assert
            expect(productModel.getAllProducts).toHaveBeenCalled();
            expect(result).toEqual(mockProducts);
        });

        it("should return an empty array when the database call returns null", async () => {
            // Arrange
            (productModel.getAllProducts as jest.Mock).mockResolvedValue([]);

            // Act
            const result = await productService.getAllProducts();

            // Assert
            expect(productModel.getAllProducts).toHaveBeenCalledTimes(1);
            expect(result).toEqual([]);
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

        it("should return null when no product is found", async () => {
            // Arrange
            (productModel.getProductById as jest.Mock).mockResolvedValue(null);

            // Act
            const result = await productService.getProductById(1);

            // Assert
            expect(productModel.getProductById).toHaveBeenCalledWith(1);
            expect(result).toBeNull();
        });
    });

    describe("createProduct", () => {
        it("should create and return the product", async () => {
            // Arrange
            const mockProduct = {
                name: "test",
                description: "test",
                price: 2000,
            };
            (productModel.createProduct as jest.Mock).mockResolvedValue(mockProduct);

            // Act
            const result = await productService.createProduct(mockProduct);

            // Assert
            expect(productModel.createProduct).toHaveBeenCalledWith(mockProduct);
            expect(result).toEqual(mockProduct);
        });
    });

    describe("updateProduct", () => {
        it("should update and return the product", async () => {
            // Arrange
            const mockUpdatedProduct = {
                description: "test",
                name: "Updated Product A",
                price: 150,
            };
            (productModel.updateProduct as jest.Mock).mockResolvedValue(mockUpdatedProduct);

            // Act
            const result = await productService.updateProduct(1, mockUpdatedProduct);

            // Assert
            expect(productModel.updateProduct).toHaveBeenCalledWith(1, mockUpdatedProduct);
            expect(result).toEqual(mockUpdatedProduct);
        });
    });

    describe("deleteProduct", () => {
        it("should delete and return the product", async () => {
            // Arrange
            const mockDeletedProduct = { id: 1, name: "Product A", price: 100 };
            (productModel.deleteProduct as jest.Mock).mockResolvedValue(mockDeletedProduct);

            // Act
            const result = await productService.deleteProduct(1);

            // Assert
            expect(productModel.deleteProduct).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockDeletedProduct);
        });
    });
});