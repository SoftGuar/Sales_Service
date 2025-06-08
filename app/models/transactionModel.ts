// src/models/transactionModel.ts
import prisma from '../services/prismaService';
import {
  TransactionCreationError,
  TransactionsFetchError,
  TransactionFetchError,
  TransactionUpdateError,
  TransactionDeletionError,
  ProductTransactionCreationError,
  SalesFetchError,
  ProductTransactionConfirmationError
} from '../errors/TransactionErrors';

export interface CreateTransactionInput {
  user_id: number;
  commercial_id: number;
}
export interface ProductTransactionInput {
  dispositive_id: number;
  transaction_id: number;
}
export interface UpdateTransactionInput {
  user_id?: number;
  commercial_id?: number;
}

export const transactionModel = {
  async createTransaction(data: CreateTransactionInput) {
    try {
      return await prisma.transaction.create({ data });
    } catch (err: any) {
      throw new TransactionCreationError(err);
    }
  },

  async getTransactions() {
    try {
      return await prisma.transaction.findMany();
    } catch (err: any) {
      throw new TransactionsFetchError(err);
    }
  },

  async getTransactionById(id: number) {
    try {
      return await prisma.transaction.findUnique({ where: { id } });
    } catch (err: any) {
      throw new TransactionFetchError(id, err);
    }
  },

  async updateTransaction(id: number, data: UpdateTransactionInput) {
    try {
      return await prisma.transaction.update({ where: { id }, data });
    } catch (err: any) {
      throw new TransactionUpdateError(id, err);
    }
  },

  async deleteTransaction(id: number) {
    try {
      return await prisma.transaction.delete({ where: { id } });
    } catch (err: any) {
      throw new TransactionDeletionError(id, err);
    }
  },

  async createProductTransaction(data: ProductTransactionInput) {
    try {
      return await prisma.productTransaction.create({ data });
    } catch (err: any) {
      throw new ProductTransactionCreationError(err);
    }
  },

  async getSales() {
    try {
      const sales = await prisma.productTransaction.findMany({
        include: {
          Transaction: { include: { User: true, Commercial: true } },
          Dispositive: true
        }
      });
      return sales.map(sale => ({
        transactionId: sale.transaction_id,
        userName: sale.Transaction.User.first_name + ' ' + sale.Transaction.User.last_name,
        commercialName: sale.Transaction.Commercial.first_name + ' ' + sale.Transaction.Commercial.last_name,
        date: sale.created_at,
        dispositiveId: sale.Dispositive.id,
        Status: sale.isConfirmed
      }));
    } catch (err: any) {
      throw new SalesFetchError(err);
    }
  },

  async confirmProductTransaction(transaction_id: number, dispositive_id: number) {
    try {
      return await prisma.productTransaction.update({
        where: { transaction_id_dispositive_id: { transaction_id, dispositive_id } },
        data: { isConfirmed: true }
      });
    } catch (err: any) {
      throw new ProductTransactionConfirmationError(transaction_id, dispositive_id, err);
    }
  }
};
