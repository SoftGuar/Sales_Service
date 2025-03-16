import dispositiveService from "../services/dispositiveService";
import { FastifyRequest, FastifyReply } from "fastify";

/**
 * Retrieves all dispositives from the database.
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends a response with the list of dispositives or an error message.
 */
export const getAllDispositives = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const dispositives = await dispositiveService.getAllDispositives();
    if (dispositives) {
      reply.send(dispositives);
    } else {
      reply.code(500).send({ message: "Dispositive not found" });
    }
  } catch (error: any) {
    reply.code(500).send({ message: "An error occurred while getting dispositives" });
  }
};

/**
 * Retrieves an available dispositive for a specific product.
 * @param {FastifyRequest<{ Params: { product_id: number } }>} request - The Fastify request object containing the product ID in the params.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends a response with the available dispositive or an error message.
 */
export const getAvailableDispositive = async (
  request: FastifyRequest<{ Params: { product_id: number } }>,
  reply: FastifyReply
) => {
  const productId = request.params.product_id;
  try {
    const dispositive = await dispositiveService.findAvailableDispositive(Number(productId));
    if (dispositive) {
      reply.send(dispositive);
    } else {
      reply.code(404).send({ message: "Dispositive not found" });
    }
  } catch (error: any) {
    reply.code(500).send({ message: "An error occurred while getting dispositive", error: error.message });
  }
};