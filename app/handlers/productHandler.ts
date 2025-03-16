import { productService } from '../services/productService';
import { CreateProduct, UpdateProductInput } from '../models/productModel';
import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * Represents the request body for creating a product.
 */
export interface CreateProductRequest {
  Body: CreateProduct;
}

/**
 * Represents the request for updating a product, including the product ID in the params and the updated data in the body.
 */
export interface UpdateProductRequest {
  Params: { id: number };
  Body: UpdateProductInput;
}

/**
 * Creates a new product.
 * @param {FastifyRequest<CreateProductRequest>} request - The Fastify request object containing the product data in the body.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends the created product or an error message.
 */
export const createProduct = async (
  request: FastifyRequest<CreateProductRequest>,
  reply: FastifyReply
) => {
  const product = request.body;
  reply.log.info('Creating product:', product);
  const newProduct = await productService.createProduct(product);
  if (newProduct) {
    reply.send(newProduct);
  } else {
    reply.code(500).send({ message: 'Failed to create product' });
  }
};

/**
 * Retrieves all products.
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends the list of products or an error message.
 */
export const getAllProducts = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const products = await productService.getAllProducts();
  if (products) {
    reply.send(products);
  } else {
    reply.code(500).send({ message: 'Failed to get products' });
  }
};

/**
 * Retrieves a product by its ID.
 * @param {FastifyRequest<{ Params: { id: number } }>} request - The Fastify request object containing the product ID in the params.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends the product or an error message if the product is not found.
 */
export const getProductById = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const productId = request.params.id;
  const product = await productService.getProductById(productId);
  if (product) {
    reply.send(product);
  } else {
    reply.code(404).send({ message: 'Product not found' });
  }
};

/**
 * Updates an existing product.
 * @param {FastifyRequest<UpdateProductRequest>} request - The Fastify request object containing the product ID in the params and the updated data in the body.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends the updated product or an error message if the product is not found.
 */
export const updateProduct = async (
  request: FastifyRequest<UpdateProductRequest>,
  reply: FastifyReply
) => {
  const productId = request.params.id;
  const product = request.body;
  const updatedProduct = await productService.updateProduct(productId, product);
  if (updatedProduct) {
    reply.send(updatedProduct);
  } else {
    reply.code(404).send({ message: 'Product not found' });
  }
};

/**
 * Deletes a product by its ID.
 * @param {FastifyRequest<{ Params: { id: number } }>} request - The Fastify request object containing the product ID in the params.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends the deleted product or an error message if the product is not found.
 */
export const deleteProduct = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const productId = request.params.id;
  const deletedProduct = await productService.deleteProduct(productId);
  if (deletedProduct) {
    reply.send(deletedProduct);
  } else {
    reply.code(404).send({ message: 'Product not found' });
  }
};