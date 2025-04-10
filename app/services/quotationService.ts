import * as quotationModel from '../models/quotationModel';

export const QuotationService = {
  /**
   * Creates a new quotation in the database.
   * @param {quotationModel.CreateQuotationInput} data - The quotation data to create.
   * @returns {Promise<Object>} A promise that resolves to the created quotation object.
   * @throws {Error} If the quotation creation fails.
   */
  createQuotation: async (data: quotationModel.CreateQuotationInput) => {
    try {
      return await quotationModel.QuotationModel.create(data);
    } catch (error) {
      console.error('Error creating quotation:', error);
      throw new Error('Failed to create quotation');
    }
  },

  /**
   * Retrieves a quotation by its ID.
   * @param {number} id - The ID of the quotation to retrieve.
   * @returns {Promise<Object>} A promise that resolves to the quotation object.
   * @throws {Error} If the quotation is not found or the database query fails.
   */
  getQuotationById: async (id: number) => {
    try {
      return await quotationModel.QuotationModel.findById(id);
    } catch (error) {
      console.error('Error fetching quotation by ID:', error);
      throw new Error('Failed to fetch quotation by ID');
    }
  },

  /**
   * Retrieves all quotations from the database.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of quotation objects.
   * @throws {Error} If the database query fails.
   */
  getAllQuotations: async () => {
    try {
      return await quotationModel.QuotationModel.getAll();
    } catch (error) {
      console.error('Error fetching all quotations:', error);
      throw new Error('Failed to fetch all quotations');
    }
  },

  /**
   * Updates an existing quotation in the database.
   * @param {number} id - The ID of the quotation to update.
   * @param {quotationModel.UpdateQuotationInput} data - The updated quotation data.
   * @returns {Promise<Object>} A promise that resolves to the updated quotation object.
   * @throws {Error} If the quotation update fails.
   */
  updateQuotation: async (id: number, data: quotationModel.UpdateQuotationInput) => {
    try {
      return await quotationModel.QuotationModel.update(id, data);
    } catch (error) {
      console.error('Error updating quotation:', error);
      throw new Error('Failed to update quotation');
    }
  },

  /**
   * Deletes a quotation from the database.
   * @param {number} id - The ID of the quotation to delete.
   * @returns {Promise<Object>} A promise that resolves to the deleted quotation object.
   * @throws {Error} If the quotation deletion fails.
   */
  deleteQuotation: async (id: number) => {
    try {
      return await quotationModel.QuotationModel.delete(id);
    } catch (error) {
      console.error('Error deleting quotation:', error);
      throw new Error('Failed to delete quotation');
    }
  },

  /**
   * Associates a product with a quotation.
   * @param {number} quotationId - The ID of the quotation.
   * @param {number} productId - The ID of the product to associate.
   * @param {number} count - The quantity of the product to associate.
   * @returns {Promise<Object>} A promise that resolves to the association result.
   * @throws {Error} If the association fails.
   */
  associateProduct: async (quotationId: number, productId: number, count: number) => {
    try {
      return await quotationModel.QuotationModel.associateProduct(quotationId, productId, count);
    } catch (error) {
      console.error('Error associating product with quotation:', error);
      throw new Error('Failed to associate product with quotation');
    }
  },

  /**
   * Retrieves quotations by user ID.
   * @param {number} userId - The ID of the user to retrieve quotations for.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of quotation objects.
   * @throws {Error} If the database query fails.
   */
  findByUserId: async (user_id: number) => {
    try {
      return await quotationModel.QuotationModel.findByUserId(user_id);
    } catch (error) {
      console.error('Error finding quotations by user ID:', error);
      throw new Error('Failed to find quotations by user ID');
    }
  },

  /**
   * Creates a quotation request with associated products.
   * @param {number} user_id - The ID of the user creating the quotation.
   * @param {Array<{ product_id: number, count: number }>} products - An array of products to associate with the quotation.
   * @returns {Promise<void>} A promise that resolves when the quotation request is created.
   * @throws {Error} If the quotation request creation fails.
   */
  demandeQuotation: async (
    user_id: number,
    products: { product_id: number, count: number }[]
  ) => {
    try {
      const quotation = await quotationModel.QuotationModel.create({
        user_id,
      });
      for (let product of products) {
        await quotationModel.QuotationModel.associateProduct(
          Number(quotation?.id),
          product.product_id,
          product.count
        );
      }
      return quotation;
    } catch (error) {
      console.error('Error creating quotation request:', error);
      throw new Error('Failed to create quotation request');
    }
  },
};