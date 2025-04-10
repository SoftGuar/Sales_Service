import * as transactionModel from '../models/transactionModel';

export const TransactionService = {
  /**
   * Creates a new transaction in the database.
   * @param {transactionModel.CreateTransactionInput} data - The transaction data to create.
   * @returns {Promise<Object>} A promise that resolves to the created transaction object.
   * @throws {Error} If the transaction creation fails.
   */
  createTransaction: async (data: transactionModel.CreateTransactionInput) => {
    try {
      return transactionModel.transactionModel.createTransaction(data);
    } catch (error: any) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  /**
   * Retrieves all transactions from the database.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of transaction objects.
   * @throws {Error} If the database query fails.
   */
  getTransactions: async () => {
    try {
      return transactionModel.transactionModel.getTransactions();
    } catch (error: any) {
      console.error('Error getting transactions:', error);
      throw error;
    }
  },

  /**
   * Retrieves a transaction by its ID.
   * @param {number} id - The ID of the transaction to retrieve.
   * @returns {Promise<Object>} A promise that resolves to the transaction object.
   * @throws {Error} If the transaction is not found or the database query fails.
   */
  getTransactionById: async (id: number) => {
    try {
      return transactionModel.transactionModel.getTransactionById(id);
    } catch (error: any) {
      console.error('Error getting transaction by ID:', error);
      throw error;
    }
  },

  /**
   * Updates an existing transaction in the database.
   * @param {number} id - The ID of the transaction to update.
   * @param {transactionModel.UpdateTransactionInput} data - The updated transaction data.
   * @returns {Promise<Object>} A promise that resolves to the updated transaction object.
   * @throws {Error} If the transaction update fails.
   */
  updateTransaction: async (id: number, data: transactionModel.UpdateTransactionInput) => {
    try {
      return transactionModel.transactionModel.updateTransaction(id, data);
    } catch (error: any) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },

  /**
   * Deletes a transaction from the database.
   * @param {number} id - The ID of the transaction to delete.
   * @returns {Promise<Object>} A promise that resolves to the deleted transaction object.
   * @throws {Error} If the transaction deletion fails.
   */
  deleteTransaction: async (id: number) => {
    try {
      return transactionModel.transactionModel.deleteTransaction(id);
    } catch (error: any) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  },

  /**
   * Creates a new product transaction in the database.
   * @param {transactionModel.ProductTransactionInput} data - The product transaction data to create.
   * @returns {Promise<Object>} A promise that resolves to the created product transaction object.
   * @throws {Error} If the product transaction creation fails.
   */
  createProductTransaction: async (data: transactionModel.ProductTransactionInput) => {
    try {
      return transactionModel.transactionModel.createProductTransaction(data);
    } catch (error: any) {
      console.error('Error creating product transaction:', error);
      throw error;
    }
  },
  /**
   * Retrieves sales details from the database.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of sales details.
   * @throws {Error} If the database query fails.
   */
  getSales: async (): Promise<Array<{
        transactionId: number;
        userName: string;
        commercialName: string;
        date: Date;
        dispositiveId: number;
        Status: boolean;
  }>> => {
    try {
      return transactionModel.transactionModel.getSales();
    } catch (error: any) {
      console.error('Error getting sales:', error);
      throw error;
    }
  },
  confirmProductTransaction: async (transaction_id: number, dispositive_id:number) => {
    try {
      return transactionModel.transactionModel.confirmProductTransaction(transaction_id, dispositive_id);
    } catch (error: any) {
      console.error('Error updating product transaction:', error);
      throw error;
    }
  }
};
