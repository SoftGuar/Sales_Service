import { dispositiveService } from "../services/dispositiveService";
import { FastifyRequest, FastifyReply } from "fastify";

export const getAllDispositives = async (
    request: FastifyRequest,
    reply: FastifyReply,) => {
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
export const getAvailableDispositive = async (
    request: FastifyRequest<{ Params: { product_id: number } }>,
    reply: FastifyReply,
) => {
    const productId = request.params.product_id;
    try {
        const dispositive = await dispositiveService.findAvailableDispositive(Number(productId));
        if (dispositive) {
            reply.send(dispositive);
        } else {
            reply.code(404).send({ message: 'Dispositive not found' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while getting dispositive' ,error:error.message});
    }
}