import { getAllDispositives, getAvailableDispositive } from "../handlers/dispositiveHandler";
import { FastifyRequest, FastifyReply } from "fastify";

// Mock the dispositiveService module
jest.mock("../services/dispositiveService");
import dispositiveService from "../services/dispositiveService";
describe("dispositiveHandler", () => {
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReply = {
            send: jest.fn(),
            code: jest.fn().mockReturnThis(),
        };
    });

    describe("getAllDispositives", () => {
        it("should send dispositives when service call succeeds", async () => {
            // Arrange
            const mockDispositives = [
                { id: 1, type: "Type A", state: "available" },
                { id: 2, type: "Type B", state: "in-use" },
            ];
            (dispositiveService.getAllDispositives as jest.Mock).mockResolvedValue(mockDispositives);

            const mockRequest = {} as FastifyRequest;

            // Act
            await getAllDispositives(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(dispositiveService.getAllDispositives).toHaveBeenCalledTimes(1);
            expect(mockReply.send).toHaveBeenCalledWith(mockDispositives);
        });

        it("should send a 500 error when service call fails", async () => {
            // Arrange
            (dispositiveService.getAllDispositives as jest.Mock).mockRejectedValue(new Error("Service error"));

            const mockRequest = {} as FastifyRequest;

            // Act
            await getAllDispositives(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(dispositiveService.getAllDispositives).toHaveBeenCalledTimes(1);
            expect(mockReply.code).toHaveBeenCalledWith(500);
            expect(mockReply.send).toHaveBeenCalledWith({ message: "An error occurred while getting dispositives" });
        });
    });

    describe("getAvailableDispositive", () => {
        it("should send the dispositive when service call succeeds", async () => {
            // Arrange
            const mockDispositive = { id: 1, type: "Type A", state: "available" };
            (dispositiveService.findAvailableDispositive as jest.Mock).mockResolvedValue(mockDispositive);

            const mockRequest = {
                params: { product_id: 1 },
            } as unknown as FastifyRequest<{ Params: { product_id: number } }>;

            // Act
            await getAvailableDispositive(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(dispositiveService.findAvailableDispositive).toHaveBeenCalledWith(1);
            expect(mockReply.send).toHaveBeenCalledWith(mockDispositive);
        });

        it("should send a 404 error when no dispositive is found", async () => {
            // Arrange
            (dispositiveService.findAvailableDispositive as jest.Mock).mockResolvedValue(null);

            const mockRequest = {
                params: { product_id: 1 },
            } as unknown as FastifyRequest<{ Params: { product_id: number } }>;

            // Act
            await getAvailableDispositive(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(dispositiveService.findAvailableDispositive).toHaveBeenCalledWith(1);
            expect(mockReply.code).toHaveBeenCalledWith(404);
            expect(mockReply.send).toHaveBeenCalledWith({ message: "Dispositive not found" });
        });

        it("should send a 500 error when service call fails", async () => {
            // Arrange
            (dispositiveService.findAvailableDispositive as jest.Mock).mockRejectedValue(new Error("Service error"));

            const mockRequest = {
                params: { product_id: 1 },
            } as unknown as FastifyRequest<{ Params: { product_id: number } }>;

            // Act
            await getAvailableDispositive(mockRequest, mockReply as FastifyReply);

            // Assert
            expect(dispositiveService.findAvailableDispositive).toHaveBeenCalledWith(1);
            expect(mockReply.code).toHaveBeenCalledWith(500);
            expect(mockReply.send).toHaveBeenCalledWith({
                message: "An error occurred while getting dispositive",
                error: "Service error",
            });
        });
    });
});