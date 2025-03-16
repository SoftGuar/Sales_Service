import * as pm from "../models/productModel";
import prisma from "./prismaService";

export const productService = {
  async getAllProducts() {
    const products = await prisma.product.findMany();
    return products;
  },
  async getProductById(id: number) {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    return product;
  },
  async createProduct(product: pm.CreateProduct) {
    //print debug message
    await prisma.product.create({
      data: product,
    });
    return product;
  },
  async updateProduct(id: number, product: pm.UpdateProductInput) {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: product,
    });
    return updatedProduct;
  },
  async deleteProduct(id: number) {
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });
    return deletedProduct;
  },
};
