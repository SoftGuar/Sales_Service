import { getAvailableDispositive } from "../handlers/dispositiveHandler";
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
    });
});