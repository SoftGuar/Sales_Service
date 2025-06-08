import { BaseError } from './BaseError';

export class NoAvailableDispositiveError extends BaseError {
  constructor(productId: number, context?: string) {
    super(
      `No available dispositive found for product ID ${productId}.`,
      'NO_AVAILABLE_DISPOSITIVE',
      404,
      { productId },
      context ?? 'orderService.order',
      'Ensure the product has an available dispositive before ordering.',
      true
    );
  }
}

export class InvalidUserError extends BaseError {
  constructor(userId: number, context?: string) {
    super(
      `Invalid or missing user with ID ${userId}.`,
      'INVALID_USER',
      400,
      { userId },
      context ?? 'orderService.order',
      'Verify that the user exists and is correctly specified.',
      true
    );
  }
}

export class TransactionCreationError extends BaseError {
  constructor(details?: any, context?: string) {
    super(
      'Failed to create transaction.',
      'TRANSACTION_CREATION_FAILED',
      500,
      details,
      context ?? 'orderService.order',
      'Try again later or contact support.',
      true
    );
  }
}

export class OrderProcessingError extends BaseError {
  constructor(original: any, context?: string) {
    super(
      `Failed to process order: ${original.message}`,
      'ORDER_PROCESSING_FAILED',
      500,
      { originalMessage: original.message },
      context ?? 'orderService.order',
      'Contact support if the issue persists.',
      false
    );
  }
}
