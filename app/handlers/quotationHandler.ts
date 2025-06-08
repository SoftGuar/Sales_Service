import { QuotationService } from "../services/quotationService";
import * as qm from "../models/quotationModel";
import { FastifyRequest, FastifyReply } from "fastify";
import { Quotation } from "@prisma/client";

/**
 * Represents the request body for creating a quotation.
 */
export interface CreateQuotationRequest {
  Body: qm.CreateQuotationInput;
}

/**
 * Represents the request for updating a quotation, including the quotation ID in the params and the updated data in the body.
 */
export interface UpdateQuotationRequest {
  Params: { id: number };
  Body: qm.UpdateQuotationInput;
}

/**
 * Represents the request for associating a product with a quotation, including the quotation ID in the params and the product details in the body.
 */
export interface AssociateProductRequest {
  Params: { id: number };
  Body: { product_id: number; count: number };
}

/**
 * Creates a new quotation.
 * @param {FastifyRequest<CreateQuotationRequest>} request - The Fastify request object containing the quotation data in the body.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends the created quotation or an error message.
 */
export const createQuotation = async (
  request: FastifyRequest<CreateQuotationRequest>,
  reply: FastifyReply
) => {

    const quotation = request.body;
    reply.log.info("Creating quotation:", quotation);
    const newQuotation = await QuotationService.createQuotation(quotation);
    if (newQuotation) {
      reply.code(201).send({ message: "Quotation created successfully", quotation: newQuotation });
    } else {
      reply.code(500).send({ message: "Failed to create quotation" });
    }
};

/**
 * Retrieves all quotations.
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends the list of quotations or an error message.
 */
export const getAllQuotations = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {

    const quotations = await QuotationService.getAllQuotations();
    if (quotations) {
      reply.code(200).send(quotations);
    } else {
      reply.code(500).send({ message: "Failed to get quotations" });
    }
};

/**
 * Retrieves a quotation by its ID.
 * @param {FastifyRequest<{ Params: { id: number } }>} request - The Fastify request object containing the quotation ID in the params.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends the quotation or an error message if the quotation is not found.
 */
export const getQuotationById = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {

    const quotationId = Number(request.params.id);
    const quotation = await QuotationService.getQuotationById(quotationId);
    if (quotation) {
      reply.send(quotation);
    } else {
      reply.code(404).send({ message: "Quotation not found" });
    }
};

/**
 * Updates an existing quotation.
 * @param {FastifyRequest<UpdateQuotationRequest>} request - The Fastify request object containing the quotation ID in the params and the updated data in the body.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends the updated quotation or an error message if the quotation is not found.
 */
export const updateQuotation = async (
  request: FastifyRequest<UpdateQuotationRequest>,
  reply: FastifyReply
) => {

    const quotationId = Number(request.params.id);
    const quotation = request.body;
    const updatedQuotation = await QuotationService.updateQuotation(
      Number(quotationId),
      quotation
    );
    if (updatedQuotation) {
      reply.send(updatedQuotation);
    } else {
      reply.code(404).send({ message: "Quotation not found" });
    }
};

/**
 * Deletes a quotation by its ID.
 * @param {FastifyRequest<{ Params: { id: number } }>} request - The Fastify request object containing the quotation ID in the params.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends the deleted quotation or an error message if the quotation is not found.
 */
export const deleteQuotation = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {

    const quotationId = Number(request.params.id);
    const deletedQuotation = await QuotationService.deleteQuotation(
      quotationId
    );
    if (deletedQuotation) {
      reply.send(deletedQuotation);
    } else {
      reply.code(404).send({ message: "Quotation not found" });
    }
};

/**
 * Associates a product with a quotation.
 * @param {FastifyRequest<AssociateProductRequest>} request - The Fastify request object containing the quotation ID in the params and the product details in the body.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends the associated product or an error message if the product is not found.
 */
export const associateProduct = async (
  request: FastifyRequest<AssociateProductRequest>,
  reply: FastifyReply
) => {

    const quotationId = Number(request.params.id);
    const productId = Number(request.body.product_id);
    const count = Number(request.body.count);
    const associatedProduct = await QuotationService.associateProduct(
      quotationId,
      productId,
      count
    );
    if (associatedProduct) {
      reply.code(200).send(associatedProduct);
    } else {
      reply.code(404).send({ message: "Product not found" });
    }
};

/**
 * Retrieves quotations by user ID.
 * @param {FastifyRequest<{ Params: { id: number } }>} request - The Fastify request object containing the user ID in the params.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} Sends the list of quotations or an error message if no quotations are found.
 */
export const getQuotationByUserId = async (
  request: FastifyRequest<{ Params: { user_id: number } }>,
  reply: FastifyReply
) => {
    const user_id = Number(request.params.user_id);
    const quotations = await QuotationService.findByUserId(user_id);
    if (quotations) {
      reply.send(quotations);
    } else {
      reply.code(404).send({ message: "Quotation not found" });
    }
};
/**
 * Handles the creation of a quotation request with associated products.
 *
 * @param request - The Fastify request object containing the user ID and products.
 * @param reply - The Fastify reply object used to send the response.
 * @returns A response confirming the creation of the quotation request or an error message.
 */
export const demandeQuotation = async (
  request: FastifyRequest<{
    Body: {
      user_id: number;
      products: { product_id: number; count: number }[];
    };
  }>,
  reply: FastifyReply
) => {

    const { user_id, products } = request.body;
    const quotation = await QuotationService.demandeQuotation(
      user_id,
      products
    );
    reply
      .code(201)
      .send({
        message: "Quotation request created successfully",
        quotation: quotation,
      });
};