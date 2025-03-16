import { get } from 'http';
import * as transactionModel from '../models/transactionModel';
import { createProduct } from '../handlers/productHandler';

export const TransactionService = {
    createTransaction: async (data : transactionModel.CreateTransactionInput) => {
        try {
            return transactionModel.transactionModel.createTransaction(data);
        } catch (error:any) {
            console.error('Error creating transaction:', error);
            throw error;
        }
    },
    getTransactions: async () => {
        try {
            return transactionModel.transactionModel.getTransactions();
        } catch (error:any) {
            console.error('Error getting transactions:', error);
            throw error;
        }
    },
    getTransactionById: async (id:number) => {
        try {
            return transactionModel.transactionModel.getTransactionById(id);
        } catch (error:any) {
            console.error('Error getting transaction by ID:', error);
            throw error;
        }
    },
    updateTransaction: async (id:number, data:transactionModel.UpdateTransactionInput) => {
        try {
            return transactionModel.transactionModel.updateTransaction(id,data);
        } catch (error:any) {
            console.error('Error updating transaction:', error);
            throw error;
        }
    },
    deleteTransaction: async (id:number) => {
        try {
            return transactionModel.transactionModel.deleteTransaction(id);
        } catch (error:any) {
            console.error('Error deleting transaction:', error);
            throw error;
        }
    },
    createProductTransaction: async (data:transactionModel.ProductTransactionInput) => {
        try {
            return transactionModel.transactionModel.createProductTransaction(data);
        } catch (error:any) {
            console.error('Error creating product transaction:', error);
            throw error;
        }
    },
};
