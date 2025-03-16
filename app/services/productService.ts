import { productModel ,CreateProduct,UpdateProductInput} from "../models/productModel";
import prisma from "./prismaService";

export const productService = {
  async getAllProducts() {
    const products = await productModel.getAllProducts();
    return products;
  },
  async getProductById(id: number) {
    const product = await productModel.getProductById(id);
    return product;
  },
  async createProduct(product: CreateProduct) {
    const result = await productModel.createProduct(product);
    return result;
  },
  async updateProduct(id: number, product: UpdateProductInput) {
    const updatedProduct = await productModel.updateProduct(id, product);
    return updatedProduct;
  },
  async deleteProduct(id: number) {
    const deletedProduct = await productModel.deleteProduct(id);
    return deletedProduct;
  },
};
