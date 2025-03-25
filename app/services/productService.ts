import { productModel } from "../models/productModel";

export const productService = {
  /**
   * Retrieves all products from the database.
   * @returns {Promise<Array<Product>>} A promise that resolves to an array of product objects.
   * @throws {Error} If the database query fails.
   */
  async getAllProducts() {
    try {
      const products = await productModel.getAllProducts();
      return products;
    } catch (error: any) {
      throw new Error(`Error retrieving all products: ${error.message}`);
    }
  },

  /**
   * Retrieves a product by its ID.
   * @param {number} id - The ID of the product to retrieve.
   * @returns {Promise<Product|null>} A promise that resolves to the product object, or null if not found.
   * @throws {Error} If the database query fails or the ID is invalid.
   */
  async getProductById(id: number) {
    if (!id || typeof id !== "number") {
      throw new Error("Invalid product ID provided.");
    }

    try {
      const product = await productModel.getProductById(id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found.`);
      }
      return product;
    } catch (error: any) {
      throw new Error(`Error retrieving product with ID ${id}: ${error.message}`);
    }
  },
};