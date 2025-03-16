import dispositiveService from "../services/dispositiveService";

// Mock the dispositiveModel module
jest.mock("../models/dispositiveModel");
import dispositiveModel from "../models/dispositiveModel";
describe("dispositiveService", () => {
    // Clear all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllDispositives", () => {
        it("should return an array of dispositives when the model call succeeds", async () => {
            // Arrange
            const mockDispositives = [
                { id: 1, type: "Type A", state: "available" },
                { id: 2, type: "Type B", state: "in-use" },
            ];
            (dispositiveModel.getAllDispositives as jest.Mock).mockResolvedValue(mockDispositives);

            // Act
            const result = await dispositiveService.getAllDispositives();

            // Assert
            expect(dispositiveModel.getAllDispositives).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockDispositives);
        });

        it("should return an empty array when the model call returns null", async () => {
            // Arrange
            (dispositiveModel.getAllDispositives as jest.Mock).mockResolvedValue(null);

            // Act
            const result = await dispositiveService.getAllDispositives();

            // Assert
            expect(dispositiveModel.getAllDispositives).toHaveBeenCalledTimes(1);
            expect(result).toEqual([]);
        });

        it("should return an empty array when the model call fails", async () => {
            // Arrange
            (dispositiveModel.getAllDispositives as jest.Mock).mockRejectedValue(new Error("Database error"));

            // Act
            const result = await dispositiveService.getAllDispositives();

            // Assert
            expect(dispositiveModel.getAllDispositives).toHaveBeenCalledTimes(1);
            expect(result).toEqual([]);
        });
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

        it("should return an empty array when no available dispositive is found", async () => {
            // Arrange
            (dispositiveModel.findAvailableDispositive as jest.Mock).mockResolvedValue(null);

            // Act
            const result = await dispositiveService.findAvailableDispositive(1);

            // Assert
            expect(dispositiveModel.findAvailableDispositive).toHaveBeenCalledWith(1);
            expect(result).toEqual([]);
        });

        it("should return an empty array when the model call fails", async () => {
            // Arrange
            (dispositiveModel.findAvailableDispositive as jest.Mock).mockRejectedValue(new Error("Database error"));

            // Act
            const result = await dispositiveService.findAvailableDispositive(1);

            // Assert
            expect(dispositiveModel.findAvailableDispositive).toHaveBeenCalledWith(1);
            expect(result).toEqual([]);
        });
    });
});