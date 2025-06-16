import { getAllProducts, getProductById } from "../handlers/productHandler";
import { FastifyRequest, FastifyReply } from "fastify";

// Mock the productService module
jest.mock("../services/productService");
import { productService } from "../services/productService";

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
        child: jest.fn(),
        level: "info",
        silent: jest.fn(),
      },
    };
  });

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      // Arrange
      const mockProducts = [
        { id: 1, name: "Product A" },
        { id: 2, name: "Product B" },
      ];
      (productService.getAllProducts as jest.Mock).mockResolvedValue(
        mockProducts
      );

      const mockRequest = {} as FastifyRequest;

      // Act
      await getAllProducts(mockRequest, mockReply as FastifyReply);

      // Assert
      expect(productService.getAllProducts).toHaveBeenCalledTimes(1);
      expect(mockReply.send).toHaveBeenCalledWith(mockProducts);
    });
  });

  describe("getProductById", () => {
    it("should return the product if found", async () => {
      // Arrange
      const mockProduct = { id: 1, name: "Product A" };
      (productService.getProductById as jest.Mock).mockResolvedValue(
        mockProduct
      );

      const mockRequest = { params: { id: 1 } } as FastifyRequest<{
        Params: { id: number };
      }>;

      // Act
      await getProductById(mockRequest, mockReply as FastifyReply);

      // Assert
      expect(productService.getProductById).toHaveBeenCalledWith(1);
      expect(mockReply.send).toHaveBeenCalledWith(mockProduct);
    });

  });
});