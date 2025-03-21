import {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    CreateTransactionRequest,
    UpdateTransactionRequest,
    ProductTransactionRequest
    } from "../handlers/transactionHandler";
import { FastifyRequest, FastifyReply } from "fastify";
import { TransactionService } from "../services/transactionService";


// Mock the TransactionService module
jest.mock("../services/transactionService");

describe("transactionHandler", () => {
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

describe("createTransaction", () => {
    it("should create a transaction and return it", async () => {
        const mockTransaction = { user_id: 1, commercial_id: 2, date: new Date() };
        const mockCreatedTransaction = { id: 1, ...mockTransaction };
        (TransactionService.createTransaction as jest.Mock).mockResolvedValue(mockCreatedTransaction);

        const mockRequest = {
            body: mockTransaction,
        } as unknown as FastifyRequest<CreateTransactionRequest>;

        await createTransaction(mockRequest, mockReply as FastifyReply);

        expect(TransactionService.createTransaction).toHaveBeenCalledWith(mockTransaction);
        expect(mockReply.code).toHaveBeenCalledWith(201);
        expect(mockReply.send).toHaveBeenCalledWith(mockCreatedTransaction);
    });

    it("should return a 500 error if transaction creation fails", async () => {
        const mockTransaction = { user_id: 1, commercial_id: 2, date: new Date() };
        (TransactionService.createTransaction as jest.Mock).mockResolvedValue(null);

        const mockRequest = {
            body: mockTransaction,
        } as unknown as FastifyRequest<CreateTransactionRequest>;

        await createTransaction(mockRequest, mockReply as FastifyReply);

        expect(TransactionService.createTransaction).toHaveBeenCalledWith(mockTransaction);
        expect(mockReply.code).toHaveBeenCalledWith(500);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Failed to create transaction" });
    });
});

describe("getTransactions", () => {
    it("should return all transactions", async () => {
        const mockTransactions = [{ user_id: 1, commercial_id: 2, date: new Date() }, { user_id: 2, commercial_id: 2, date: new Date() }];
        (TransactionService.getTransactions as jest.Mock).mockResolvedValue(mockTransactions);

        const mockRequest = {} as FastifyRequest;

        await getTransactions(mockRequest, mockReply as FastifyReply);

        expect(TransactionService.getTransactions).toHaveBeenCalledTimes(1);
        expect(mockReply.send).toHaveBeenCalledWith(mockTransactions);
    });

    it("should return a 500 error if fetching transactions fails", async () => {
        (TransactionService.getTransactions as jest.Mock).mockResolvedValue(null);

        const mockRequest = {} as FastifyRequest;

        await getTransactions(mockRequest, mockReply as FastifyReply);

        expect(TransactionService.getTransactions).toHaveBeenCalledTimes(1);
        expect(mockReply.code).toHaveBeenCalledWith(500);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Failed to get transactions" });
    });
});

describe("getTransactionById", () => {
    it("should return the transaction if found", async () => {
        const mockTransaction = { user_id: 1, commercial_id: 2, date: new Date() };
        (TransactionService.getTransactionById as jest.Mock).mockResolvedValue(mockTransaction);

        const mockRequest = { params: { id: 1 } } as FastifyRequest<{ Params: { id: number } }>;

        await getTransactionById(mockRequest, mockReply as FastifyReply);

        expect(TransactionService.getTransactionById).toHaveBeenCalledWith(1);
        expect(mockReply.send).toHaveBeenCalledWith(mockTransaction);
    });

    it("should return a 500 error if transaction is not found", async () => {
        (TransactionService.getTransactionById as jest.Mock).mockResolvedValue(null);

        const mockRequest = { params: { id: 1 } } as FastifyRequest<{ Params: { id: number } }>;

        await getTransactionById(mockRequest, mockReply as FastifyReply);

        expect(TransactionService.getTransactionById).toHaveBeenCalledWith(1);
        expect(mockReply.code).toHaveBeenCalledWith(500);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Failed to get transaction" });
    });
});

describe("updateTransaction", () => {
    it("should update the transaction and return it", async () => {
        const mockTransaction = { date: new Date() };
        const mockUpdatedTransaction = { id: 1, ...mockTransaction };
        (TransactionService.updateTransaction as jest.Mock).mockResolvedValue(mockUpdatedTransaction);

        const mockRequest = {
            params: { id: 1 },
            body: mockTransaction,
        } as unknown as FastifyRequest<UpdateTransactionRequest>;

        await updateTransaction(mockRequest, mockReply as FastifyReply);

        expect(TransactionService.updateTransaction).toHaveBeenCalledWith(1, mockTransaction);
        expect(mockReply.send).toHaveBeenCalledWith(mockUpdatedTransaction);
    });

    it("should return a 500 error if transaction update fails", async () => {
        const mockTransaction = {date: new Date() };
        (TransactionService.updateTransaction as jest.Mock).mockResolvedValue(null);

        const mockRequest = {
            params: { id: 1 },
            body: mockTransaction,
        } as unknown as FastifyRequest<UpdateTransactionRequest>;

        await updateTransaction(mockRequest, mockReply as FastifyReply);

        expect(TransactionService.updateTransaction).toHaveBeenCalledWith(1, mockTransaction);
        expect(mockReply.code).toHaveBeenCalledWith(500);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Failed to update transaction" });
    });
});

describe("deleteTransaction", () => {
    it("should delete the transaction and return it", async () => {
        const mockDeletedTransaction ={ user_id: 1, commercial_id: 2, date: new Date() };
        (TransactionService.deleteTransaction as jest.Mock).mockResolvedValue(mockDeletedTransaction);

        const mockRequest = { params: { id: 1 } } as FastifyRequest<{ Params: { id: number } }>;

        await deleteTransaction(mockRequest, mockReply as FastifyReply);

        expect(TransactionService.deleteTransaction).toHaveBeenCalledWith(1);
        expect(mockReply.send).toHaveBeenCalledWith(mockDeletedTransaction);
    });

    it("should return a 500 error if transaction deletion fails", async () => {
        (TransactionService.deleteTransaction as jest.Mock).mockResolvedValue(null);

        const mockRequest = { params: { id: 1 } } as FastifyRequest<{ Params: { id: number } }>;

        await deleteTransaction(mockRequest, mockReply as FastifyReply);

        expect(TransactionService.deleteTransaction).toHaveBeenCalledWith(1);
        expect(mockReply.code).toHaveBeenCalledWith(500);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Failed to delete transaction" });
    });
});
});