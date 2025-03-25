import { productService } from "../services/productService";
import { FastifyRequest, FastifyReply } from "fastify";

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
  try {
    const products = await productService.getAllProducts();
    reply.send(products);
  } catch (error: any) {
    reply
      .code(500)
      .send({ message: "Failed to get products", error: error.message });
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
  try {
    const productId = Number(request.params.id);
    if (isNaN(productId)) {
      reply.code(400).send({ message: "Invalid product ID" });
      return;
    }

    const product = await productService.getProductById(productId);
    reply.send(product);
  } catch (error: any) {
    if (error.message.includes("not found")) {
      reply.code(404).send({ message: error.message });
    } else {
      reply
        .code(500)
        .send({ message: "Failed to get product", error: error.message });
    }
  }
};