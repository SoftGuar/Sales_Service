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
    });
});
