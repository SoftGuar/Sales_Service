// src/errors/ProductErrors.ts
import { BaseError } from './BaseError';

export class ProductsRetrievalError extends BaseError {
  constructor(context?: string) {
    super(
      'Failed to retrieve products.',
      'PRODUCTS_RETRIEVAL_FAILED',
      500,
      undefined,
      context ?? 'productService.getAllProducts',
      'Please try again later or contact support.',
      true
    );
  }
}

export class InvalidProductIdError extends BaseError {
  constructor(param: any, context?: string) {
    super(
      `Invalid product ID: ${param}`,
      'INVALID_PRODUCT_ID',
      400,
      { received: param },
      context ?? 'productService.getProductById',
      'Ensure the ID is a valid number.',
      true
    );
  }
}

export class ProductNotFoundError extends BaseError {
  constructor(productId: number, context?: string) {
    super(
      `Product with ID ${productId} not found.`,
      'PRODUCT_NOT_FOUND',
      404,
      { productId },
      context ?? 'productService.getProductById',
      'Verify the product ID exists.',
      true
    );
  }
}

export class ProductFetchError extends BaseError {
  constructor(productId: number, originalError: any, context?: string) {
    super(
      `Error fetching product ${productId}: ${originalError.message}`,
      'PRODUCT_FETCH_ERROR',
      500,
      { productId, originalMessage: originalError.message },
      context ?? 'productService.getProductById',
      'Please try again later or contact support.',
      true
    );
  }
}


export class ProductsFetchError extends BaseError {
    constructor(originalError: any, context?: string) {
      super(
        `Failed to fetch products: ${originalError.message}`,
        'PRODUCTS_FETCH_ERROR',
        500,
        { originalMessage: originalError.message },
        context ?? 'productModel.getAllProducts',
        'Please try again later or contact support.',
        true
      );
    }
  }
