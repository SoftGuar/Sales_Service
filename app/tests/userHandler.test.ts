import { createUser } from "../handlers/userHandler";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/usersService";
import { CreateUserInput, CreateHelperInput } from "../models/userModel";

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
        it("should create a user and helper and return them", async () => {
            const mockUserData: CreateUserInput = {
                first_name: "John",
                last_name: "Doe",
                email: "john@example.com",
                password: "securepassword",
                role: "user",
                phone: "1234567890",
            };
            const mockHelperData: CreateHelperInput = {
                first_name: "Jane",
                last_name: "Smith",
                email: "jane@example.com",
                password: "securepassword",
                phone: "0987654321",
            };
            const mockCreatedData = {
                user: { id: 1, ...mockUserData },
                helper: { id: 2, ...mockHelperData },
            };
            (UserService.createUserandHelper as jest.Mock).mockResolvedValue(mockCreatedData);

            const mockRequest = {
                body: { userData: mockUserData, helperData: mockHelperData },
            } as unknown as FastifyRequest<{ Body: { userData: CreateUserInput; helperData: CreateHelperInput } }>;

            await createUser(mockRequest, mockReply as FastifyReply);

            expect(UserService.createUserandHelper).toHaveBeenCalledWith(mockUserData, mockHelperData);
            expect(mockReply.code).toHaveBeenCalledWith(201);
            expect(mockReply.send).toHaveBeenCalledWith({
                success: true,
                data: mockCreatedData,
            });
        });

        it("should return a 400 error if user and helper creation fails", async () => {
            const mockUserData: CreateUserInput = {
                first_name: "John",
                last_name: "Doe",
                email: "john@example.com",
                password: "securepassword",
                role: "user",
                phone: "1234567890",
            };
            const mockHelperData: CreateHelperInput = {
                first_name: "Jane",
                last_name: "Smith",
                email: "jane@example.com",
                password: "securepassword",
                phone: "0987654321",
            };
            (UserService.createUserandHelper as jest.Mock).mockRejectedValue(new Error("User creation failed"));

            const mockRequest = {
                body: { userData: mockUserData, helperData: mockHelperData },
            } as unknown as FastifyRequest<{ Body: { userData: CreateUserInput; helperData: CreateHelperInput } }>;

            await createUser(mockRequest, mockReply as FastifyReply);

            expect(UserService.createUserandHelper).toHaveBeenCalledWith(mockUserData, mockHelperData);
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
            const mockHelperData: CreateHelperInput = {
                first_name: "Jane",
                last_name: "Smith",
                email: "jane@example.com",
                password: "securepassword",
                phone: "0987654321",
            };
            (UserService.createUserandHelper as jest.Mock).mockRejectedValue("Unexpected error");

            const mockRequest = {
                body: { userData: mockUserData, helperData: mockHelperData },
            } as unknown as FastifyRequest<{ Body: { userData: CreateUserInput; helperData: CreateHelperInput } }>;

            await createUser(mockRequest, mockReply as FastifyReply);

            expect(UserService.createUserandHelper).toHaveBeenCalledWith(mockUserData, mockHelperData);
            expect(mockReply.code).toHaveBeenCalledWith(400);
            expect(mockReply.send).toHaveBeenCalledWith({
                success: false,
                message: "An unexpected error occurred",
            });
        });
    });
});