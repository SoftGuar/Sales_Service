import { BaseError } from './BaseError';

export class QuotationCreationError extends BaseError {
  constructor(details?: any, context?: string) {
    super(
      'Failed to create quotation.',
      'QUOTATION_CREATION_FAILED',
      500,
      details,
      context ?? 'QuotationService.createQuotation',
      'Please try again later or contact support.',
      true
    );
  }
}

export class QuotationRetrievalError extends BaseError {
  constructor(details?: any, context?: string) {
    super(
      'Failed to retrieve quotation(s).',
      'QUOTATION_RETRIEVAL_FAILED',
      500,
      details,
      context ?? 'QuotationService',
      'Please try again later or contact support.',
      true
    );
  }
}

export class QuotationNotFoundError extends BaseError {
  constructor(quotationId: number, context?: string) {
    super(
      `Quotation with ID ${quotationId} not found.`,
      'QUOTATION_NOT_FOUND',
      404,
      { quotationId },
      context ?? 'QuotationService.getQuotationById',
      'Verify the quotation ID exists.',
      true
    );
  }
}

export class QuotationUpdateError extends BaseError {
  constructor(quotationId: number, details?: any, context?: string) {
    super(
      `Failed to update quotation ${quotationId}.`,
      'QUOTATION_UPDATE_FAILED',
      500,
      details,
      context ?? 'QuotationService.updateQuotation',
      'Please try again later or contact support.',
      true
    );
  }
}

export class QuotationDeletionError extends BaseError {
  constructor(quotationId: number, details?: any, context?: string) {
    super(
      `Failed to delete quotation ${quotationId}.`,
      'QUOTATION_DELETION_FAILED',
      500,
      details,
      context ?? 'QuotationService.deleteQuotation',
      'Please try again later or contact support.',
      true
    );
  }
}

export class ProductAssociationError extends BaseError {
  constructor(quotationId: number, productId: number, details?: any, context?: string) {
    super(
      `Failed to associate product ${productId} with quotation ${quotationId}.`,
      'PRODUCT_ASSOCIATION_FAILED',
      500,
      details,
      context ?? 'QuotationService.associateProduct',
      'Verify product and quotation IDs are correct.',
      true
    );
  }
}

export class QuotationsByUserRetrievalError extends BaseError {
  constructor(userId: number, details?: any, context?: string) {
    super(
      `Failed to retrieve quotations for user ${userId}.`,
      'QUOTATIONS_BY_USER_RETRIEVAL_FAILED',
      500,
      details,
      context ?? 'QuotationService.findByUserId',
      'Please try again later or contact support.',
      true
    );
  }
}

export class QuotationRequestError extends BaseError {
  constructor(userId: number, details?: any, context?: string) {
    super(
      `Failed to create quotation request for user ${userId}.`,
      'QUOTATION_REQUEST_FAILED',
      500,
      details,
      context ?? 'QuotationService.demandeQuotation',
      'Please try again later or contact support.',
      true
    );
  }
}
  
  export class QuotationFetchError extends BaseError {
    constructor(quotationId: number, originalError: any, context?: string) {
      super(
        `Error fetching quotation ${quotationId}: ${originalError.message}`,
        'QUOTATION_FETCH_ERROR',
        500,
        { quotationId, originalMessage: originalError.message },
        context ?? 'QuotationModel.findById',
        'Please try again later or contact support.',
        true
      );
    }
  }
  
  export class QuotationsFetchError extends BaseError {
    constructor(originalError: any, context?: string) {
      super(
        `Error fetching all quotations: ${originalError.message}`,
        'QUOTATIONS_FETCH_ERROR',
        500,
        { originalMessage: originalError.message },
        context ?? 'QuotationModel.getAll',
        'Please try again later or contact support.',
        true
      );
    }
  }  
  export class QuotationsByUserFetchError extends BaseError {
    constructor(userId: number, originalError: any, context?: string) {
      super(
        `Error fetching quotations for user ${userId}: ${originalError.message}`,
        'QUOTATIONS_BY_USER_FETCH_ERROR',
        500,
        { userId, originalMessage: originalError.message },
        context ?? 'QuotationModel.findByUserId',
        'Please try again later or contact support.',
        true
      );
    }
  }