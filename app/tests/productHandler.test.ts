import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct,CreateProductRequest } from "../handlers/productHandler";
import { FastifyRequest, FastifyReply } from "fastify";

// Mock the productService module
jest.mock("../services/productService");
import { productService } from "../services/productService";
import { CreateProduct } from "../models/productModel";
describe("productHandler", () => {
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReply = {
            send: jest.fn(),
            code: jest.fn().mockReturnThis(),
            log: {
            info: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
            fatal: jest.fn(),
            trace: jest.fn(),
            child: jest.fn(), // Mock the child method
            level: "info", // Mock the level property
            silent: jest.fn(), // Mock the silent method
              },
        };
    });

    describe("createProduct", () => {
        it("should create a product and return it", async () => {
            // Arrange
            const mockProduct = {
            name: "test",
            description: "test",
            price: 2000,
            };
            const mockCreatedProduct = { id: 1, ...mockProduct };
            (productService.createProduct as jest.Mock).mockResolvedValue(mockCreatedProduct);

            const mockRequest = {
            body: mockProduct,
            } as unknown as FastifyRequest<CreateProductRequest>;

            // Act
            await createProduct(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(productService.createProduct).toHaveBeenCalledWith(mockProduct);
            expect(mockReply.send).toHaveBeenCalledWith(mockCreatedProduct);
        });

        it("should return a 500 error if product creation fails", async () => {
            // Arrange
            const mockProduct = { name: "Product A", price: 100 };
            (productService.createProduct as jest.Mock).mockResolvedValue(null);

            const mockRequest = {
                body: mockProduct,
              } as unknown as FastifyRequest<CreateProductRequest>;

            // Act
            await createProduct(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(productService.createProduct).toHaveBeenCalledWith(mockProduct);
            expect(mockReply.code).toHaveBeenCalledWith(500);
            expect(mockReply.send).toHaveBeenCalledWith({ message: "Failed to create product" });
        });
    });

    describe("getAllProducts", () => {
        it("should return all products", async () => {
            // Arrange
            const mockProducts = [{ id: 1, name: "Product A" }, { id: 2, name: "Product B" }];
            (productService.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);

            const mockRequest = {} as FastifyRequest;

            // Act
            await getAllProducts(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(productService.getAllProducts).toHaveBeenCalledTimes(1);
            expect(mockReply.send).toHaveBeenCalledWith(mockProducts);
        });

        it("should return a 500 error if fetching products fails", async () => {
            // Arrange
            (productService.getAllProducts as jest.Mock).mockResolvedValue(null);

            const mockRequest = {} as FastifyRequest;

            // Act
            await getAllProducts(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(productService.getAllProducts).toHaveBeenCalledTimes(1);
            expect(mockReply.code).toHaveBeenCalledWith(500);
            expect(mockReply.send).toHaveBeenCalledWith({ message: "Failed to get products" });
        });
    });

    describe("getProductById", () => {
        it("should return the product if found", async () => {
            // Arrange
            const mockProduct = { id: 1, name: "Product A" };
            (productService.getProductById as jest.Mock).mockResolvedValue(mockProduct);

            const mockRequest = { params: { id: 1 } } as FastifyRequest<{ Params: { id: number } }>;

            // Act
            await getProductById(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(productService.getProductById).toHaveBeenCalledWith(1);
            expect(mockReply.send).toHaveBeenCalledWith(mockProduct);
        });

        it("should return a 404 error if product is not found", async () => {
            // Arrange
            (productService.getProductById as jest.Mock).mockResolvedValue(null);

            const mockRequest = { params: { id: 1 } } as FastifyRequest<{ Params: { id: number } }>;

            // Act
            await getProductById(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(productService.getProductById).toHaveBeenCalledWith(1);
            expect(mockReply.code).toHaveBeenCalledWith(404);
            expect(mockReply.send).toHaveBeenCalledWith({ message: "Product not found" });
        });
    });

    describe("updateProduct", () => {
        it("should update the product and return it", async () => {
            // Arrange
            const mockProduct = { name: "Updated Product", price: 150 };
            const mockUpdatedProduct = { id: 1, ...mockProduct };
            (productService.updateProduct as jest.Mock).mockResolvedValue(mockUpdatedProduct);

            const mockRequest = {
                params: { id: 1 },
                body: mockProduct,
            } as FastifyRequest<{ Params: { id: number }; Body: typeof mockProduct }>;

            // Act
            await updateProduct(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(productService.updateProduct).toHaveBeenCalledWith(1, mockProduct);
            expect(mockReply.send).toHaveBeenCalledWith(mockUpdatedProduct);
        });

        it("should return a 404 error if product is not found", async () => {
            // Arrange
            const mockProduct = { name: "Updated Product", price: 150 };
            (productService.updateProduct as jest.Mock).mockResolvedValue(null);

            const mockRequest = {
                params: { id: 1 },
                body: mockProduct,
            } as FastifyRequest<{ Params: { id: number }; Body: typeof mockProduct }>;

            // Act
            await updateProduct(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(productService.updateProduct).toHaveBeenCalledWith(1, mockProduct);
            expect(mockReply.code).toHaveBeenCalledWith(404);
            expect(mockReply.send).toHaveBeenCalledWith({ message: "Product not found" });
        });
    });

    describe("deleteProduct", () => {
        it("should delete the product and return it", async () => {
            // Arrange
            const mockDeletedProduct = { id: 1, name: "Product A" };
            (productService.deleteProduct as jest.Mock).mockResolvedValue(mockDeletedProduct);

            const mockRequest = { params: { id: 1 } } as FastifyRequest<{ Params: { id: number } }>;

            // Act
            await deleteProduct(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(productService.deleteProduct).toHaveBeenCalledWith(1);
            expect(mockReply.send).toHaveBeenCalledWith(mockDeletedProduct);
        });

        it("should return a 404 error if product is not found", async () => {
            // Arrange
            (productService.deleteProduct as jest.Mock).mockResolvedValue(null);

            const mockRequest = { params: { id: 1 } } as FastifyRequest<{ Params: { id: number } }>;

            // Act
            await deleteProduct(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(productService.deleteProduct).toHaveBeenCalledWith(1);
            expect(mockReply.code).toHaveBeenCalledWith(404);
            expect(mockReply.send).toHaveBeenCalledWith({ message: "Product not found" });
        });
    });
});