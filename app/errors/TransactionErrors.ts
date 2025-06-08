// src/errors/TransactionErrors.ts
import { BaseError } from './BaseError';

export class TransactionCreationError extends BaseError {
  constructor(details?: any, context?: string) {
    super(
      'Failed to create transaction.',
      'TRANSACTION_CREATION_FAILED',
      500,
      details,
      context ?? 'TransactionService.createTransaction',
      'Please try again later or contact support.',
      true
    );
  }
}

export class TransactionsRetrievalError extends BaseError {
  constructor(context?: string) {
    super(
      'Failed to retrieve transactions.',
      'TRANSACTIONS_RETRIEVAL_FAILED',
      500,
      undefined,
      context ?? 'TransactionService.getTransactions',
      'Please try again later or contact support.',
      true
    );
  }
}

export class TransactionFetchError extends BaseError {
  constructor(transactionId: number, originalError: any, context?: string) {
    super(
      `Error fetching transaction ${transactionId}: ${originalError.message}`,
      'TRANSACTION_FETCH_ERROR',
      500,
      { transactionId, originalMessage: originalError.message },
      context ?? 'TransactionService.getTransactionById',
      'Please try again later or contact support.',
      true
    );
  }
}

export class TransactionUpdateError extends BaseError {
  constructor(transactionId: number, details?: any, context?: string) {
    super(
      `Failed to update transaction ${transactionId}.`,
      'TRANSACTION_UPDATE_FAILED',
      500,
      details,
      context ?? 'TransactionService.updateTransaction',
      'Please try again later or contact support.',
      true
    );
  }
}

export class TransactionDeletionError extends BaseError {
  constructor(transactionId: number, details?: any, context?: string) {
    super(
      `Failed to delete transaction ${transactionId}.`,
      'TRANSACTION_DELETION_FAILED',
      500,
      details,
      context ?? 'TransactionService.deleteTransaction',
      'Please try again later or contact support.',
      true
    );
  }
}

export class ProductTransactionCreationError extends BaseError {
  constructor(details?: any, context?: string) {
    super(
      'Failed to create product transaction.',
      'PRODUCT_TRANSACTION_CREATION_FAILED',
      500,
      details,
      context ?? 'TransactionService.createProductTransaction',
      'Please try again later or contact support.',
      true
    );
  }
}

export class SalesRetrievalError extends BaseError {
  constructor(context?: string) {
    super(
      'Failed to retrieve sales details.',
      'SALES_RETRIEVAL_FAILED',
      500,
      undefined,
      context ?? 'TransactionService.getSales',
      'Please try again later or contact support.',
      true
    );
  }
}

export class ProductTransactionConfirmationError extends BaseError {
  constructor(transactionId: number, dispositiveId: number, details?: any, context?: string) {
    super(
      `Failed to confirm product ${dispositiveId} on transaction ${transactionId}.`,
      'PRODUCT_TRANSACTION_CONFIRMATION_FAILED',
      500,
      details,
      context ?? 'TransactionService.confirmProductTransaction',
      'Please try again later or contact support.',
      true
    );
  }
}

export class TransactionsFetchError extends BaseError {
  constructor(originalError: any, context?: string) {
    super(
      `Error retrieving transactions: ${originalError.message}`,
      'TRANSACTIONS_FETCH_ERROR',
      500,
      { originalMessage: originalError.message },
      context ?? 'transactionModel.getTransactions',
      'Please try again later or contact support.',
      true
    );
  }
}




export class SalesFetchError extends BaseError {
  constructor(originalError: any, context?: string) {
    super(
      `Error retrieving sales details: ${originalError.message}`,
      'SALES_FETCH_ERROR',
      500,
      { originalMessage: originalError.message },
      context ?? 'transactionModel.getSales',
      'Please try again later or contact support.',
      true
    );
  }
}

