// src/services/transactionService.ts
import * as transactionModel from '../models/transactionModel';
import {
  TransactionCreationError,
  TransactionsRetrievalError,
  TransactionFetchError,
  TransactionUpdateError,
  TransactionDeletionError,
  ProductTransactionCreationError,
  SalesRetrievalError,
  ProductTransactionConfirmationError
} from '../errors/TransactionErrors';

export const TransactionService = {
  async createTransaction(data: transactionModel.CreateTransactionInput) {
    const trx = await transactionModel.transactionModel
      .createTransaction(data)
      .catch(err => { throw new TransactionCreationError({ data, originalMessage: err.message }); });
    if (!trx) throw new TransactionCreationError({ data });
    return trx;
  },

  async getTransactions() {
    const list = await transactionModel.transactionModel
      .getTransactions()
      .catch(() => { throw new TransactionsRetrievalError(); });
    if (!list) throw new TransactionsRetrievalError();
    return list;
  },

  async getTransactionById(id: number) {
    const trx = await transactionModel.transactionModel
      .getTransactionById(id)
      .catch(err => { throw new TransactionFetchError(id, err); });
    if (!trx) throw new TransactionFetchError(id, new Error('Transaction not found'));
    return trx;
  },

  async updateTransaction(id: number, data: transactionModel.UpdateTransactionInput) {
    const updated = await transactionModel.transactionModel
      .updateTransaction(id, data)
      .catch(err => { throw new TransactionUpdateError(id, { data, originalMessage: err.message }); });
    if (!updated) throw new TransactionUpdateError(id, { data });
    return updated;
  },

  async deleteTransaction(id: number) {
    const deleted = await transactionModel.transactionModel
      .deleteTransaction(id)
      .catch(err => { throw new TransactionDeletionError(id, { originalMessage: err.message }); });
    if (!deleted) throw new TransactionDeletionError(id);
    return deleted;
  },

  async createProductTransaction(data: transactionModel.ProductTransactionInput) {
    const pt = await transactionModel.transactionModel
      .createProductTransaction(data)
      .catch(err => { throw new ProductTransactionCreationError({ data, originalMessage: err.message }); });
    if (!pt) throw new ProductTransactionCreationError({ data });
    return pt;
  },

  async getSales() {
    const sales = await transactionModel.transactionModel
      .getSales()
      .catch(() => { throw new SalesRetrievalError(); });
    if (!sales) throw new SalesRetrievalError();
    return sales;
  },

  async confirmProductTransaction(transaction_id: number, dispositive_id: number) {
    const result = await transactionModel.transactionModel
      .confirmProductTransaction(transaction_id, dispositive_id)
      .catch(err => { throw new ProductTransactionConfirmationError(transaction_id, dispositive_id, { originalMessage: err.message }); });
    if (!result) throw new ProductTransactionConfirmationError(transaction_id, dispositive_id);
    return result;
  }
};
