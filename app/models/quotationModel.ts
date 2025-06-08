import prisma from '../services/prismaService';
import { Quotation } from '@prisma/client';
import {
  QuotationCreationError,
  QuotationFetchError,
  QuotationsFetchError,
  QuotationUpdateError,
  QuotationDeletionError,
  ProductAssociationError,
  QuotationsByUserFetchError
} from '../errors/QuotationErrors';

export interface CreateQuotationInput { user_id: number }
export interface UpdateQuotationInput { user_id?: number }

export const QuotationModel = {
  async create(quotationData: CreateQuotationInput): Promise<Quotation> {
    try {
      return await prisma.quotation.create({ data: quotationData });
    } catch (err: any) {
      throw new QuotationCreationError(err);
    }
  },

  async findById(id: number): Promise<Quotation> {
    try {
      const q = await prisma.quotation.findUnique({ where: { id } });
      if (!q) throw new Error('Not found');
      return q;
    } catch (err: any) {
      throw new QuotationFetchError(id, err);
    }
  },

  async getAll(): Promise<Quotation[]> {
    try {
      return await prisma.quotation.findMany();
    } catch (err: any) {
      throw new QuotationsFetchError(err);
    }
  },

  async update(id: number, quotationData: UpdateQuotationInput): Promise<Quotation> {
    try {
      return await prisma.quotation.update({ where: { id }, data: quotationData });
    } catch (err: any) {
      throw new QuotationUpdateError(id, err);
    }
  },

  async delete(id: number): Promise<Quotation> {
    try {
      return await prisma.quotation.delete({ where: { id } });
    } catch (err: any) {
      throw new QuotationDeletionError(id, err);
    }
  },

  async associateProduct(quotationId: number, productId: number, count: number): Promise<any> {
    try {
      return await prisma.productQuotation.create({
        data: { quotation_id: quotationId, product_id: productId, count }
      });
    } catch (err: any) {
      throw new ProductAssociationError(quotationId, productId, err);
    }
  },

  async findByUserId(userId: number): Promise<Quotation[]> {
    try {
      return await prisma.quotation.findMany({ where: { user_id: userId } });
    } catch (err: any) {
      throw new QuotationsByUserFetchError(userId, err);
    }
  }
};