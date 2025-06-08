import { BaseError } from './BaseError';

export class DispositiveNotFoundError extends BaseError {
  constructor(productId: number, context?: string) {
    super(
      `No available dispositive found for product ID ${productId}.`, // message
      'DISPOSITIVE_NOT_FOUND',                                  // errorCode
      404,                                                      // statusCode
      { productId },                                            // details
      context ?? 'dispositiveService.findAvailableDispositive', // context
      'Ensure the product ID is valid and that an available dispositive exists.', // suggestion
      true                                                     // isOperational
    );
  }
}

export class DispositiveRetrievalError extends BaseError {
  constructor(productId: number, originalError?: any, context?: string) {
    super(
      `Failed to retrieve dispositive for product ID ${productId}: ${originalError?.message}`,
      'DISPOSITIVE_RETRIEVAL_ERROR',                            // errorCode
      500,                                                      // statusCode
      { productId, originalMessage: originalError?.message },  // details
      context ?? 'dispositiveService.findAvailableDispositive', // context
      'Try again later or contact support if the issue persists.', // suggestion
      true                                                     // isOperational
    );
  }
}

export class DispositiveQueryError extends BaseError {
  constructor(productId: number, originalError: any, context?: string) {
    super(
      `Database error querying dispositive for product ${productId}: ${originalError.message}`,
      'DISPOSITIVE_QUERY_ERROR',
      500,
      { productId, originalMessage: originalError.message },
      context ?? 'dispositiveModel.findAvailableDispositive',
      'Please try again later or contact support.',
      true
    );
  }
}