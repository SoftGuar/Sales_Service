// app/services/userService.ts
import { create } from 'domain';
import * as quotationModel from '../models/quotationModel';

export const QuotationService = {
    createQuotation: async (data: quotationModel.CreateQuotationInput) => {
        try {
            return await quotationModel.QuotationModel.create(data);
        } catch (error) {
            console.error('Error creating quotation:', error);
            throw new Error('Failed to create quotation');
        }
    },

    getQuotationById: async (id: number) => {
        try {
            return await quotationModel.QuotationModel.findById(id);
        } catch (error) {
            console.error('Error fetching quotation by ID:', error);
            throw new Error('Failed to fetch quotation by ID');
        }
    },

    getAllQuotations: async () => {
        try {
            return await quotationModel.QuotationModel.getAll();
        } catch (error) {
            console.error('Error fetching all quotations:', error);
            throw new Error('Failed to fetch all quotations');
        }
    },

    updateQuotation: async (id: number, data: quotationModel.UpdateQuotationInput) => {
        try {
            return await quotationModel.QuotationModel.update(id, data);
        } catch (error) {
            console.error('Error updating quotation:', error);
            throw new Error('Failed to update quotation');
        }
    },

    deleteQuotation: async (id: number) => {
        try {
            return await quotationModel.QuotationModel.delete(id);
        } catch (error) {
            console.error('Error deleting quotation:', error);
            throw new Error('Failed to delete quotation');
        }
    },

    associateProduct: async (quotationId: number, productId: number, count: number) => {
        try {
            return await quotationModel.QuotationModel.associateProduct(quotationId, productId, count);
        } catch (error) {
            console.error('Error associating product with quotation:', error);
            throw new Error('Failed to associate product with quotation');
        }
    },

    findByUserId: async (userId: number) => {
        try {
            return await quotationModel.QuotationModel.findByUserId(userId);
        } catch (error) {
            console.error('Error finding quotations by user ID:', error);
            throw new Error('Failed to find quotations by user ID');
        }
    },

    demandeQuotation: async (
        user_id: number,
        products: { product_id: number, count: number }[]
    ) => {
        try {
            const quotation = await quotationModel.QuotationModel.create({
                user_id, date: new Date()
            });

            for (let product of products) {
                await quotationModel.QuotationModel.associateProduct(
                    Number(quotation?.id),
                    product.product_id,
                    product.count
                );
            }
        } catch (error) {
            console.error('Error creating quotation request:', error);
            throw new Error('Failed to create quotation request');
        }
    },
};