import dispositiveService from "../services/dispositiveService";

// Mock the dispositiveModel module
jest.mock("../models/dispositiveModel");
import dispositiveModel from "../models/dispositiveModel";

describe("dispositiveService", () => {
    // Clear all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("findAvailableDispositive", () => {
        it("should return an available dispositive when the model call succeeds", async () => {
            // Arrange
            const mockDispositive = { id: 1, type: "Type A", state: "available" };
            (dispositiveModel.findAvailableDispositive as jest.Mock).mockResolvedValue(mockDispositive);

            // Act
            const result = await dispositiveService.findAvailableDispositive(1);

            // Assert
            expect(dispositiveModel.findAvailableDispositive).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockDispositive);
        });

        it("should throw an error when no available dispositive is found", async () => {
            // Arrange
            (dispositiveModel.findAvailableDispositive as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(dispositiveService.findAvailableDispositive(1)).rejects.toThrow(
                "No available dispositive found for the product"
            );
            expect(dispositiveModel.findAvailableDispositive).toHaveBeenCalledWith(1);
        });

        it("should throw an error when the model call fails", async () => {
            // Arrange
            (dispositiveModel.findAvailableDispositive as jest.Mock).mockRejectedValue(new Error("Database error"));

            // Act & Assert
            await expect(dispositiveService.findAvailableDispositive(1)).rejects.toThrow(
                "An error occurred while retrieving the dispositive: Database error"
            );
            expect(dispositiveModel.findAvailableDispositive).toHaveBeenCalledWith(1);
        });
    });
});
