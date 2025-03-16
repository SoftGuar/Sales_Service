import { TransactionService } from "../services/transactionService";
import * as transactionModel from "../models/transactionModel";

// filepath: c:\Users\KHALED\Documents\GitHub\Sales_Service\app\tests\transactionService.test.ts

// Mock the transactionModel module
jest.mock("../models/transactionModel");

describe("TransactionService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createTransaction", () => {
        it("should create a transaction successfully", async () => {
            const mockTransaction = { id: 1, user_id: 1, commercial_id: 2, date: new Date() };
            (transactionModel.transactionModel.createTransaction as jest.Mock).mockResolvedValue(mockTransaction);

            const result = await TransactionService.createTransaction({ user_id: 1, commercial_id: 2, date: new Date() });

            expect(transactionModel.transactionModel.createTransaction).toHaveBeenCalledWith({ user_id: 1, commercial_id: 2, date: expect.any(Date) });
            expect(result).toEqual(mockTransaction);
        });

        it("should throw an error if creation fails", async () => {
            (transactionModel.transactionModel.createTransaction as jest.Mock).mockRejectedValue(new Error("Creation error"));

            await expect(
                TransactionService.createTransaction({ user_id: 1, commercial_id: 2, date: new Date() })
            ).rejects.toThrow("Creation error");
        });
    });

    describe("getTransactions", () => {
        it("should return all transactions", async () => {
            const mockTransactions = [
                { id: 1, user_id: 1, commercial_id: 2, date: new Date() },
                { id: 2, user_id: 2, commercial_id: 3, date: new Date() },
            ];
            (transactionModel.transactionModel.getTransactions as jest.Mock).mockResolvedValue(mockTransactions);

            const result = await TransactionService.getTransactions();

            expect(transactionModel.transactionModel.getTransactions).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockTransactions);
        });

        it("should throw an error if fetching fails", async () => {
            (transactionModel.transactionModel.getTransactions as jest.Mock).mockRejectedValue(new Error("Fetch error"));

            await expect(TransactionService.getTransactions()).rejects.toThrow("Fetch error");
        });
    });

    describe("getTransactionById", () => {
        it("should return a transaction by ID", async () => {
            const mockTransaction = { id: 1, user_id: 1, commercial_id: 2, date: new Date() };
            (transactionModel.transactionModel.getTransactionById as jest.Mock).mockResolvedValue(mockTransaction);

            const result = await TransactionService.getTransactionById(1);

            expect(transactionModel.transactionModel.getTransactionById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockTransaction);
        });

        it("should throw an error if fetching fails", async () => {
            (transactionModel.transactionModel.getTransactionById as jest.Mock).mockRejectedValue(new Error("Fetch error"));

            await expect(TransactionService.getTransactionById(1)).rejects.toThrow("Fetch error");
        });
    });

    describe("updateTransaction", () => {
        it("should update a transaction successfully", async () => {
            const mockUpdatedTransaction = { id: 1, user_id: 1, commercial_id: 3, date: new Date() };
            (transactionModel.transactionModel.updateTransaction as jest.Mock).mockResolvedValue(mockUpdatedTransaction);

            const result = await TransactionService.updateTransaction(1, { commercial_id: 3 });

            expect(transactionModel.transactionModel.updateTransaction).toHaveBeenCalledWith(1, { commercial_id: 3 });
            expect(result).toEqual(mockUpdatedTransaction);
        });

        it("should throw an error if update fails", async () => {
            (transactionModel.transactionModel.updateTransaction as jest.Mock).mockRejectedValue(new Error("Update error"));

            await expect(
                TransactionService.updateTransaction(1, { commercial_id: 3 })
            ).rejects.toThrow("Update error");
        });
    });

    describe("deleteTransaction", () => {
        it("should delete a transaction successfully", async () => {
            const mockDeletedTransaction = { id: 1, user_id: 1, commercial_id: 2, date: new Date() };
            (transactionModel.transactionModel.deleteTransaction as jest.Mock).mockResolvedValue(mockDeletedTransaction);

            const result = await TransactionService.deleteTransaction(1);

            expect(transactionModel.transactionModel.deleteTransaction).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockDeletedTransaction);
        });

        it("should throw an error if deletion fails", async () => {
            (transactionModel.transactionModel.deleteTransaction as jest.Mock).mockRejectedValue(new Error("Deletion error"));

            await expect(TransactionService.deleteTransaction(1)).rejects.toThrow("Deletion error");
        });
    });

    describe("createProductTransaction", () => {
        it("should create a product transaction successfully", async () => {
            const mockProductTransaction = { id: 1, dispositive_id: 1, transaction_id: 1 };
            (transactionModel.transactionModel.createProductTransaction as jest.Mock).mockResolvedValue(mockProductTransaction);

            const result = await TransactionService.createProductTransaction({ dispositive_id: 1, transaction_id: 1 });

            expect(transactionModel.transactionModel.createProductTransaction).toHaveBeenCalledWith({ dispositive_id: 1, transaction_id: 1 });
            expect(result).toEqual(mockProductTransaction);
        });

        it("should throw an error if creation fails", async () => {
            (transactionModel.transactionModel.createProductTransaction as jest.Mock).mockRejectedValue(new Error("Creation error"));

            await expect(
                TransactionService.createProductTransaction({ dispositive_id: 1, transaction_id: 1 })
            ).rejects.toThrow("Creation error");
        });
    });
});