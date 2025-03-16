import { createUser } from "../handlers/userHandler";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/usersService";
import { CreateUserInput } from "../models/userModel";

// Mock the UserService module
jest.mock("../services/usersService");

describe("userHandler", () => {
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

    describe("createUser", () => {
        it("should create a user and return it", async () => {
            const mockUserData: CreateUserInput = {
                first_name: "John",
                last_name: "Doe",
                email: "john@example.com",
                password: "securepassword",
                role: "user",
                phone: "1234567890",
            };
            const mockCreatedUser = { id: 1, ...mockUserData };
            (UserService.createUserandHelper as jest.Mock).mockResolvedValue(mockCreatedUser);

            const mockRequest = {
                body: mockUserData,
            } as unknown as FastifyRequest<{ Body: CreateUserInput }>;

            await createUser(mockRequest, mockReply as FastifyReply);

            expect(UserService.createUserandHelper).toHaveBeenCalledWith(mockUserData);
            expect(mockReply.code).toHaveBeenCalledWith(201);
            expect(mockReply.send).toHaveBeenCalledWith({
                success: true,
                data: mockCreatedUser,
            });
        });

        it("should return a 400 error if user creation fails", async () => {
            const mockUserData: CreateUserInput = {
                first_name: "John",
                last_name: "Doe",
                email: "john@example.com",
                password: "securepassword",
                role: "user",
                phone: "1234567890",
            };
            (UserService.createUserandHelper as jest.Mock).mockRejectedValue(new Error("User creation failed"));

            const mockRequest = {
                body: mockUserData,
            } as unknown as FastifyRequest<{ Body: CreateUserInput }>;

            await createUser(mockRequest, mockReply as FastifyReply);

            expect(UserService.createUserandHelper).toHaveBeenCalledWith(mockUserData);
            expect(mockReply.code).toHaveBeenCalledWith(400);
            expect(mockReply.send).toHaveBeenCalledWith({
                success: false,
                message: "User creation failed",
            });
        });

        it("should return a 400 error with a generic message if an unexpected error occurs", async () => {
            const mockUserData: CreateUserInput = {
                first_name: "John",
                last_name: "Doe",
                email: "john@example.com",
                password: "securepassword",
                role: "user",
                phone: "1234567890",
            };
            (UserService.createUserandHelper as jest.Mock).mockRejectedValue("Unexpected error");

            const mockRequest = {
                body: mockUserData,
            } as unknown as FastifyRequest<{ Body: CreateUserInput }>;

            await createUser(mockRequest, mockReply as FastifyReply);

            expect(UserService.createUserandHelper).toHaveBeenCalledWith(mockUserData);
            expect(mockReply.code).toHaveBeenCalledWith(400);
            expect(mockReply.send).toHaveBeenCalledWith({
                success: false,
                message: "An unexpected error occurred",
            });
        });
    });
});