// src/services/productService.ts
import { productModel } from '../models/productModel';
import {
  ProductsRetrievalError,
  InvalidProductIdError,
  ProductNotFoundError,
  ProductFetchError
} from '../errors/ProductErrors';

export const productService = {
  async getAllProducts() {
    try {
      return await productModel.getAllProducts();
    } catch (err: any) {
      throw new ProductsRetrievalError();
    }
  },

  async getProductById(id: number) {
    if (isNaN(id) || typeof id !== 'number') {
      throw new InvalidProductIdError(id);
    }
    try {
      const product = await productModel.getProductById(id);
      if (!product) throw new ProductNotFoundError(id);
      return product;
    } catch (err: any) {
      if (err instanceof InvalidProductIdError || err instanceof ProductNotFoundError) {
        throw err;
      }
      throw new ProductFetchError(id, err);
    }
  }
};
