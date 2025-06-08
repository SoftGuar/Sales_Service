// src/models/productModel.ts
import prisma from '../services/prismaService';
import { Product } from '@prisma/client';
import { ProductsFetchError, ProductFetchError } from '../errors/ProductErrors';

export const productModel = {
  async getAllProducts(): Promise<Product[]> {
    try {
      return await prisma.product.findMany();
    } catch (err: any) {
      throw new ProductsFetchError(err);
    }
  },

  async getProductById(id: number): Promise<Product | null> {
    try {
      return await prisma.product.findUnique({ where: { id } });
    } catch (err: any) {
      throw new ProductFetchError(id, err);
    }
  }
};
