import prisma from '../services/prismaService';

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
}

export const productModel = {
  /**
   * Retrieves all products from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of products.
   * If an error occurs, an empty array is returned.
   */
  async getAllProducts(): Promise<Array<any>> {
    try {
      const result = await prisma.product.findMany();
      if (result == null) {
        return [];
      }
      return result;
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

  /**
   * Creates a new product in the database.
   * @param {CreateProduct} product - The product data to create.
   * @returns {Promise<Object|null>} A promise that resolves to the created product object, or null if an error occurs.
   */
  async createProduct(product: CreateProduct): Promise<object | null> {
    try {
      return await prisma.product.create({
        data: product,
      });
    } catch (error) {
      console.error('Failed to create product:', error);
      return null;
    }
  },

  /**
   * Updates an existing product in the database.
   * @param {number} id - The ID of the product to update.
   * @param {UpdateProductInput} product - The product data to update.
   * @returns {Promise<Object|null>} A promise that resolves to the updated product object, or null if an error occurs.
   */
  async updateProduct(id: number, product: UpdateProductInput): Promise<object | null> {
    try {
      return await prisma.product.update({
        where: { id },
        data: product,
      });
    } catch (error) {
      console.error('Failed to update product:', error);
      return null;
    }
  },

  /**
   * Deletes a product from the database.
   * @param {number} id - The ID of the product to delete.
   * @returns {Promise<Object|null>} A promise that resolves to the deleted product object, or null if an error occurs.
   */
  async deleteProduct(id: number): Promise<object | null> {
    try {
      return await prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Failed to delete product:', error);
      return null;
    }
  },
};