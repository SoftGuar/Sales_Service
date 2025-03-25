import prisma from '../services/prismaService';
import {Product} from "@prisma/client";
export const productModel = {
  /**
   * Retrieves all products from the database.
   * @returns {Promise<Array<Product>>} A promise that resolves to an array of products.
   * If an error occurs, an empty array is returned.
   */
  async getAllProducts(): Promise<Array<Product>> {
    try {
      const result = await prisma.product.findMany();
      return result;
    } catch (error:any) {
      throw new Error(`Failed to get products: ${error.message}`);
    }
  },

  /**
   * Retrieves a single product by its ID.
   * @param {number} id - The ID of the product to retrieve.
   * @returns {Promise<Product|null>} A promise that resolves to the product object if found, or null if not found or an error occurs.
   */
  async getProductById(id: number): Promise<Product | null> {
    try { 
      const result = await prisma.product.findUnique({
        where: { id },
      });
      return result;
    } catch (error:any) {
      throw new Error(`Failed to get product with ID ${id}: ${error.message}`);
    }
  },
};