// src/services/quotationService.ts
import * as quotationModel from '../models/quotationModel';
import {
  QuotationCreationError,
  QuotationRetrievalError,
  QuotationNotFoundError,
  QuotationUpdateError,
  QuotationDeletionError,
  ProductAssociationError,
  QuotationsByUserRetrievalError,
  QuotationRequestError
} from '../errors/QuotationErrors';

export const QuotationService = {
  async createQuotation(data: quotationModel.CreateQuotationInput) {
    try {
      return await quotationModel.QuotationModel.create(data);
    } catch (err: any) {
      throw new QuotationCreationError({ data, originalMessage: err.message });
    }
  },

  async getQuotationById(id: number) {
    try {
      const q = await quotationModel.QuotationModel.findById(id);
      if (!q) throw new QuotationNotFoundError(id);
      return q;
    } catch (err: any) {
      if (err instanceof QuotationNotFoundError) throw err;
      throw new QuotationRetrievalError({ id, originalMessage: err.message }, 'QuotationService.getQuotationById');
    }
  },

  async getAllQuotations() {
    try {
      return await quotationModel.QuotationModel.getAll();
    } catch (err: any) {
      throw new QuotationRetrievalError({ originalMessage: err.message }, 'QuotationService.getAllQuotations');
    }
  },

  async updateQuotation(id: number, data: quotationModel.UpdateQuotationInput) {
    try {
      const updated = await quotationModel.QuotationModel.update(id, data);
      if (!updated) throw new QuotationNotFoundError(id);
      return updated;
    } catch (err: any) {
      if (err instanceof QuotationNotFoundError) throw err;
      throw new QuotationUpdateError(id, { data, originalMessage: err.message });
    }
  },

  async deleteQuotation(id: number) {
    try {
      const deleted = await quotationModel.QuotationModel.delete(id);
      if (!deleted) throw new QuotationNotFoundError(id);
      return deleted;
    } catch (err: any) {
      if (err instanceof QuotationNotFoundError) throw err;
      throw new QuotationDeletionError(id, { originalMessage: err.message });
    }
  },

  async associateProduct(quotationId: number, productId: number, count: number) {
    try {
      return await quotationModel.QuotationModel.associateProduct(quotationId, productId, count);
    } catch (err: any) {
      throw new ProductAssociationError(quotationId, productId, { count, originalMessage: err.message });
    }
  },

  async findByUserId(user_id: number) {
    try {
      return await quotationModel.QuotationModel.findByUserId(user_id);
    } catch (err: any) {
      throw new QuotationsByUserRetrievalError(user_id, { originalMessage: err.message });
    }
  },

  async demandeQuotation(user_id: number, products: { product_id: number; count: number }[]) {
    try {
      const quotation = await quotationModel.QuotationModel.create({ user_id });
      for (const p of products) {
        await quotationModel.QuotationModel.associateProduct(Number(quotation?.id), p.product_id, p.count);
      }
      return quotation;
    } catch (err: any) {
      throw new QuotationRequestError(user_id, { products, originalMessage: err.message });
    }
  }
};
