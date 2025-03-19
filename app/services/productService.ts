import { productModel} from "../models/productModel";

export const productService = {
  /**
   * Retrieves all products from the database.
   * @returns {Promise<Array<Product>>} A promise that resolves to an array of product objects.
   * @throws {Error} If the database query fails.
   */
  async getAllProducts() {
    const products = await productModel.getAllProducts();
    return products;
  },

  /**
   * Retrieves a product by its ID.
   * @param {number} id - The ID of the product to retrieve.
   * @returns {Promise<Product|null>} A promise that resolves to the product object, or null if not found.
   * @throws {Error} If the database query fails.
   */
  async getProductById(id: number) {
    const product = await productModel.getProductById(id);
    return product;
  },
};