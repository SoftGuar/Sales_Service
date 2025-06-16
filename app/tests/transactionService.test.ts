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
            const mockTransaction = { id: 1, user_id: 1, commercial_id: 2 };
            (transactionModel.transactionModel.createTransaction as jest.Mock).mockResolvedValue(mockTransaction);

            const result = await TransactionService.createTransaction({ user_id: 1, commercial_id: 2 });

            expect(transactionModel.transactionModel.createTransaction).toHaveBeenCalledWith({ user_id: 1, commercial_id: 2 });
            expect(result).toEqual(mockTransaction);
        });

    });

    describe("getTransactions", () => {
        it("should return all transactions", async () => {
            const mockTransactions = [
                { id: 1, user_id: 1, commercial_id: 2 },
                { id: 2, user_id: 2, commercial_id: 3 },
            ];
            (transactionModel.transactionModel.getTransactions as jest.Mock).mockResolvedValue(mockTransactions);

            const result = await TransactionService.getTransactions();

            expect(transactionModel.transactionModel.getTransactions).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockTransactions);
        });
    });

    describe("getTransactionById", () => {
        it("should return a transaction by ID", async () => {
            const mockTransaction = { id: 1, user_id: 1, commercial_id: 2 };
            (transactionModel.transactionModel.getTransactionById as jest.Mock).mockResolvedValue(mockTransaction);

            const result = await TransactionService.getTransactionById(1);

            expect(transactionModel.transactionModel.getTransactionById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockTransaction);
        });

        
    });

    describe("updateTransaction", () => {
        it("should update a transaction successfully", async () => {
            const mockUpdatedTransaction = { id: 1, user_id: 1, commercial_id: 3 };
            (transactionModel.transactionModel.updateTransaction as jest.Mock).mockResolvedValue(mockUpdatedTransaction);

            const result = await TransactionService.updateTransaction(1, { commercial_id: 3 });

            expect(transactionModel.transactionModel.updateTransaction).toHaveBeenCalledWith(1, { commercial_id: 3 });
            expect(result).toEqual(mockUpdatedTransaction);
        });

       
    });

    describe("deleteTransaction", () => {
        it("should delete a transaction successfully", async () => {
            const mockDeletedTransaction = { id: 1, user_id: 1, commercial_id: 2 };
            (transactionModel.transactionModel.deleteTransaction as jest.Mock).mockResolvedValue(mockDeletedTransaction);

            const result = await TransactionService.deleteTransaction(1);

            expect(transactionModel.transactionModel.deleteTransaction).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockDeletedTransaction);
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

        
    });
});