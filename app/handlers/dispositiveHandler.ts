import { Dispositive } from "@prisma/client";
import dispositiveService from "../services/dispositiveService";
import { FastifyRequest, FastifyReply } from "fastify";

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
    const dispositive:Dispositive = await dispositiveService.findAvailableDispositive(Number(productId));
    if (dispositive) {
      reply.code(200).send(dispositive);
    } else {
      reply.code(400).send({ message: "Dispositive not found" });
    }
  } catch (error: any) {
    reply.code(500).send({ message: "An error occurred while getting dispositive", error: error.message });
  }
};