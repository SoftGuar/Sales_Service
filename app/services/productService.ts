import { productModel, CreateProduct, UpdateProductInput } from "../models/productModel";

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

  /**
   * Creates a new product in the database.
   * @param {CreateProduct} product - The product data to create.
   * @returns {Promise<Product|null>} A promise that resolves to the created product object, or null if creation fails.
   * @throws {Error} If the database query fails.
   */
  async createProduct(product: CreateProduct) {
    const result = await productModel.createProduct(product);
    return result;
  },

  /**
   * Updates an existing product in the database.
   * @param {number} id - The ID of the product to update.
   * @param {UpdateProductInput} product - The updated product data.
   * @returns {Promise<Product|null>} A promise that resolves to the updated product object, or null if the update fails.
   * @throws {Error} If the database query fails.
   */
  async updateProduct(id: number, product: UpdateProductInput) {
    const updatedProduct = await productModel.updateProduct(id, product);
    return updatedProduct;
  },

  /**
   * Deletes a product from the database.
   * @param {number} id - The ID of the product to delete.
   * @returns {Promise<Product|null>} A promise that resolves to the deleted product object, or null if deletion fails.
   * @throws {Error} If the database query fails.
   */
  async deleteProduct(id: number) {
    const deletedProduct = await productModel.deleteProduct(id);
    return deletedProduct;
  },
};