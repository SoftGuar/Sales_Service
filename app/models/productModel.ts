import prisma from '../services/prismaService';

export const productModel = {
  /**
   * Retrieves all products from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of products.
   * If an error occurs, an empty array is returned.
   */
  async getAllProducts(): Promise<Array<any>> {
    try {
      const result = await prisma.product.findMany();
      if (result) {
        return result
      }
      else {
        return [];
      }
    } catch (error) {
      console.error('Failed to get products:', error);
      return [];
    }
  },

  /**
   * Retrieves a single product by its ID.
   * @param {number} id - The ID of the product to retrieve.
   * @returns {Promise<Object|null>} A promise that resolves to the product object if found, or null if not found or an error occurs.
   */
  async getProductById(id: number): Promise<object | null> {
    try { 
      const result = await prisma.product.findUnique({
        where: { id },
      });
      return result;
    } catch (error) {
      console.error('Failed to get product:', error);
      return null;
    }
  },
};