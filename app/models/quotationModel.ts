import { Quotation } from '@prisma/client';
import prisma from '../services/prismaService';

export interface CreateQuotationInput {
    user_id: number;
    date: Date;
}

export interface UpdateQuotationInput {
    user_id?: number;
    date?: Date;
}

export const QuotationModel = {
    /**
     * Creates a new quotation in the database.
     * @param {CreateQuotationInput} quotationData - The data for the new quotation.
     * @returns {Promise<Object|null>} The created quotation object, or null if an error occurs.
     */
    create: async (quotationData: CreateQuotationInput): Promise<Quotation | null> => {
        try {
            const result = await prisma.quotation.create({
                data: quotationData,
            });
            if (result) {
                return result;
            } else {
                throw new Error('Error creating quotation');
            }
        } catch (error) {
            console.error('Error creating quotation:', error);
            return null;
        }
    },

    /**
     * Finds a quotation by its ID.
     * @param {number} id - The ID of the quotation to find.
     * @returns {Promise<Object|null>} The quotation object, or null if not found or an error occurs.
     */
    findById: async (id: number): Promise<object | null> => {
        try {
            const result = await prisma.quotation.findUnique({
                where: { id },
            });
            if (result) {
                return result;
            } else {
                throw new Error('Error finding quotation by ID');
            }
        } catch (error) {
            console.error('Error finding quotation by ID:', error);
            return null;
        }
    },

    /**
     * Retrieves all quotations from the database.
     * @returns {Promise<Array>} An array of quotation objects, or an empty array if an error occurs.
     */
    getAll: async (): Promise<Array<any>> => {
        try {
            const result = await prisma.quotation.findMany();
            if (result) {
                return result;
            } else {
                throw new Error('Error getting all quotations');
            }
        } catch (error) {
            console.error('Error getting all quotations:', error);
            return [];
        }
    },

    /**
     * Updates a quotation by its ID.
     * @param {number} id - The ID of the quotation to update.
     * @param {UpdateQuotationInput} quotationData - The data to update the quotation with.
     * @returns {Promise<Object|null>} The updated quotation object, or null if an error occurs.
     */
    update: async (id: number, quotationData: UpdateQuotationInput): Promise<object | null> => {
        try {
            const result = await prisma.quotation.update({
                where: { id },
                data: quotationData,
            });
            if (result) {
                return result;
            } else {
                throw new Error('Error updating quotation');
            }
        } catch (error) {
            console.error('Error updating quotation:', error);
            return null;
        }
    },

    /**
     * Deletes a quotation by its ID.
     * @param {number} id - The ID of the quotation to delete.
     * @returns {Promise<Object|null>} The deleted quotation object, or null if an error occurs.
     */
    delete: async (id: number): Promise<object | null> => {
        try {
            const result = await prisma.quotation.delete({
                where: { id },
            });
            if (result) {
                return result;
            } else {
                throw new Error('Error deleting quotation');
            }
        } catch (error) {
            console.error('Error deleting quotation:', error);
            return null;
        }
    },

    /**
     * Associates a product with a quotation.
     * @param {number} quotationId - The ID of the quotation.
     * @param {number} productId - The ID of the product to associate.
     * @param {number} count - The quantity of the product.
     * @returns {Promise<Object|null>} The created product-quotation association object, or null if an error occurs.
     */
    associateProduct: async (quotationId: number, productId: number, count: number): Promise<object | null> => {
        try {
            const result = await prisma.productQuotation.create({
                data: {
                    product_id: Number(productId),
                    quotation_id: Number(quotationId),
                    count: Number(count),
                },
            });
            if (result) {
                return result;
            } else {
                throw new Error('Error associating product with quotation');
            }
        } catch (error) {
            console.error('Error associating product with quotation:', error);
            return null;
        }
    },

    /**
     * Finds all quotations associated with a specific user ID.
     * @param {number} userId - The ID of the user.
     * @returns {Promise<Array|null>} An array of quotation objects, or null if an error occurs.
     */
    findByUserId: async (userId: number): Promise<Array<any> | null> => {
        try {
            const result = await prisma.quotation.findMany({
                where: { user_id: userId },
            });
            if (result) {
                return result;
            } else {
                throw new Error('Error finding quotation by user ID');
            }
        } catch (error) {
            console.error('Error finding quotation by user ID:', error);
            return null;
        }
    },
};