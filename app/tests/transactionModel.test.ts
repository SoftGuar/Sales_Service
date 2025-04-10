import { create } from "domain";
import { transactionModel } from "../models/transactionModel";
import prismaService from "../services/prismaService";

// Mock the entire prismaService module
jest.mock("../services/prismaService", () => ({
    __esModule: true,
    default: {
        transaction: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        productTransaction: {
            create: jest.fn(),
            findMany: jest.fn(),
        },
    },
}));

describe("transactionModel", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createTransaction", () => {
        it("should create and return a transaction when prisma query succeeds", async () => {
            const newTransaction = { user_id: 1, commercial_id: 2};
            const createdTransaction = { id: 1, ...newTransaction };

            (prismaService.transaction.create as jest.Mock).mockResolvedValueOnce(createdTransaction);

            const result = await transactionModel.createTransaction(newTransaction);

            expect(prismaService.transaction.create).toHaveBeenCalledWith({ data: newTransaction });
            expect(result).toEqual(createdTransaction);
        });

        it("should throw an error when prisma query fails", async () => {
            const newTransaction = { user_id: 1, commercial_id: 2 };

            (prismaService.transaction.create as jest.Mock).mockRejectedValue(new Error("Database error"));

            await expect(transactionModel.createTransaction(newTransaction)).rejects.toThrow("Database error");
        });
    });

    describe("getTransactions", () => {
        it("should return an array of transactions when prisma query succeeds", async () => {
            const mockTransactions = [
                { id: 1, user_id: 1, commercial_id: 2 },
                { id: 2, user_id: 3, commercial_id: 4 },
            ];

            (prismaService.transaction.findMany as jest.Mock).mockResolvedValueOnce(mockTransactions);

            const result = await transactionModel.getTransactions();

            expect(prismaService.transaction.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockTransactions);
        });

        it("should throw an error when prisma query fails", async () => {
            (prismaService.transaction.findMany as jest.Mock).mockRejectedValue(new Error("Database error"));

            await expect(transactionModel.getTransactions()).rejects.toThrow("Database error");
        });
    });

    describe("getTransactionById", () => {
        it("should return a transaction when prisma query succeeds", async () => {
            const mockTransaction = { id: 1, user_id: 1, commercial_id: 2 };

            (prismaService.transaction.findUnique as jest.Mock).mockResolvedValueOnce(mockTransaction);

            const result = await transactionModel.getTransactionById(1);

            expect(prismaService.transaction.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual(mockTransaction);
        });

        it("should throw an error when prisma query fails", async () => {
            (prismaService.transaction.findUnique as jest.Mock).mockRejectedValue(new Error("Database error"));

            await expect(transactionModel.getTransactionById(1)).rejects.toThrow("Database error");
        });
    });

    describe("updateTransaction", () => {
        it("should update and return a transaction when prisma query succeeds", async () => {
            const updatedTransaction = { user_id: 2, commercial_id: 3 };
            const mockUpdatedTransaction = { id: 1, ...updatedTransaction };

            (prismaService.transaction.update as jest.Mock).mockResolvedValueOnce(mockUpdatedTransaction);

            const result = await transactionModel.updateTransaction(1, updatedTransaction);

            expect(prismaService.transaction.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: updatedTransaction,
            });
            expect(result).toEqual(mockUpdatedTransaction);
        });

        it("should throw an error when prisma query fails", async () => {
            const updatedTransaction = { user_id: 2, commercial_id: 3 };

            (prismaService.transaction.update as jest.Mock).mockRejectedValue(new Error("Database error"));

            await expect(transactionModel.updateTransaction(1, updatedTransaction)).rejects.toThrow("Database error");
        });
    });

    describe("deleteTransaction", () => {
        it("should delete and return a transaction when prisma query succeeds", async () => {
            const mockDeletedTransaction = { id: 1, user_id: 1, commercial_id: 2 };

            (prismaService.transaction.delete as jest.Mock).mockResolvedValueOnce(mockDeletedTransaction);

            const result = await transactionModel.deleteTransaction(1);

            expect(prismaService.transaction.delete).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual(mockDeletedTransaction);
        });

        it("should throw an error when prisma query fails", async () => {
            (prismaService.transaction.delete as jest.Mock).mockRejectedValue(new Error("Database error"));

            await expect(transactionModel.deleteTransaction(1)).rejects.toThrow("Database error");
        });
    });

    describe("createProductTransaction", () => {
        it("should create and return a product transaction when prisma query succeeds", async () => {
            const newProductTransaction = { dispositive_id: 1, transaction_id: 2 };
            const createdProductTransaction = { id: 1, ...newProductTransaction };

            (prismaService.productTransaction.create as jest.Mock).mockResolvedValueOnce(createdProductTransaction);

            const result = await transactionModel.createProductTransaction(newProductTransaction);

            expect(prismaService.productTransaction.create).toHaveBeenCalledWith({
                data: { dispositive_id: 1, transaction_id: 2 },
            });
            expect(result).toEqual(createdProductTransaction);
        });

        it("should throw an error when prisma query fails", async () => {
            const newProductTransaction = { dispositive_id: 1, transaction_id: 2 };

            (prismaService.productTransaction.create as jest.Mock).mockRejectedValue(new Error("Database error"));

            await expect(transactionModel.createProductTransaction(newProductTransaction)).rejects.toThrow("Database error");
        });
    });
    describe("getSales", () => {
        it("should return an array of sales details when prisma query succeeds", async () => {
            const mockSales = [
                {
                    Transaction: {
                        User: { first_name: "John", last_name: "Doe" },
                        Commercial: { first_name: "Lylia", last_name: "Aouinine" },
                    },
                    Dispositive: { id: 1 },
                    isConfirmed: true,
                    created_at: new Date(),
                    transaction_id: 1,
                },
                {
                    Transaction: {
                        User: { first_name: "Jane", last_name: "Smith" },
                        Commercial: { first_name: "Alex", last_name: "Johnson" },
                        
                    },
                    Dispositive: {id: 2 },
                    isConfirmed: false,
                    created_at: new Date(),
                    transaction_id: 2,
                },
            ];

            const expectedSalesDetails = [
                {
                    userName: "John Doe",
                    commercialName: "Lylia Aouinine",
                    dispositiveId: 1,
                    date: expect.any(Date), 
                    Status: true,
                    transactionId: 1,
                },
                {
                    userName: "Jane Smith",
                    commercialName: "Alex Johnson",
                    dispositiveId: 2,
                    date: expect.any(Date), 
                    Status: false,
                    transactionId: 2,
                },
            ];

            (prismaService.productTransaction.findMany as jest.Mock).mockResolvedValueOnce(mockSales);

            const result = await transactionModel.getSales();

            expect(prismaService.productTransaction.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual(expectedSalesDetails);
        });

        it("should throw an error when prisma query fails", async () => {
            (prismaService.productTransaction.findMany as jest.Mock).mockRejectedValue(new Error("Database error"));

            await expect(transactionModel.getSales()).rejects.toThrow("Database error");
        });
    });
});