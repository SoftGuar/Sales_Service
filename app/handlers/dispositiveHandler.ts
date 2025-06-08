import { FastifyRequest, FastifyReply } from "fastify";
import dispositiveService from "../services/dispositiveService";
import { DispositiveNotFoundError, DispositiveRetrievalError } from "../errors/DispositiveErrors";

export const getAvailableDispositive = async (
  request: FastifyRequest<{ Params: { product_id: number } }>,
  reply: FastifyReply
) => {
  const productId = request.params.product_id;

    const dispositive = await dispositiveService.findAvailableDispositive(productId);

    if (!dispositive) {
      throw new DispositiveNotFoundError(productId);
    }

    return reply.code(200).send(dispositive);

};
