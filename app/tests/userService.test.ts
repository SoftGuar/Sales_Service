import { UserService } from "../services/usersService";
import * as userModel from "../models/userModel";

// Mock the userModel module
jest.mock("../models/userModel");

describe("UserService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createUserandHelper", () => {
        it("should return null if an error occurs during user creation", async () => {
            jest.spyOn(console, "error").mockImplementation(() => {});
            const result = await UserService.createUserandHelper({
                first_name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
                password: "password123",
                role: "user",
            });

            expect(result).toBeNull();
        });
    });

    describe("getUserById", () => {
        it("should return a user by ID", async () => {
            const mockUser = { id: 1, first_name: "John", last_name: "Doe" };
            (userModel.UserModel.findById as jest.Mock).mockResolvedValue(mockUser);

            const result = await UserService.getUserById(1);

            expect(userModel.UserModel.findById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockUser);
        });

        it("should return null if the user is not found", async () => {
            (userModel.UserModel.findById as jest.Mock).mockResolvedValue(null);

            const result = await UserService.getUserById(1);

            expect(userModel.UserModel.findById).toHaveBeenCalledWith(1);
            expect(result).toBeNull();
        });

        it("should return null if an error occurs", async () => {
            (userModel.UserModel.findById as jest.Mock).mockRejectedValue(new Error("Database error"));

            const result = await UserService.getUserById(1);

            expect(result).toBeNull();
        });
    });

    describe("getAllUsers", () => {
        it("should return all users", async () => {
            const mockUsers = [
                { id: 1, first_name: "John", last_name: "Doe" },
                { id: 2, first_name: "Jane", last_name: "Smith" },
            ];
            (userModel.UserModel.getAll as jest.Mock).mockResolvedValue(mockUsers);

            const result = await UserService.getAllUsers();

            expect(userModel.UserModel.getAll).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockUsers);
        });

        it("should return an empty array if no users are found", async () => {
            (userModel.UserModel.getAll as jest.Mock).mockResolvedValue([]);

            const result = await UserService.getAllUsers();

            expect(result).toEqual([]);
        });

        it("should return an empty array if an error occurs", async () => {
            (userModel.UserModel.getAll as jest.Mock).mockRejectedValue(new Error("Database error"));

            const result = await UserService.getAllUsers();

            expect(result).toEqual([]);
        });
    });
});