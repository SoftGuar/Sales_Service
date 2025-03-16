import { QuotationService } from '../services/quotationService';
import * as qm from '../models/quotationModel';
import { FastifyRequest, FastifyReply } from 'fastify';

interface CreateQuotationRequest {
    Body: qm.CreateQuotationInput;
}
interface UpdateQuotationRequest {
    Params: { id: number };
    Body: qm.UpdateQuotationInput;
}
interface AssociateProductRequest {
    Params: { id: number };
    Body: { product_id: number, count: number };
}

export const createQuotation = async (
    request: FastifyRequest<CreateQuotationRequest>,
    reply: FastifyReply,
) => {
    try {
        const quotation = request.body;
        reply.log.info('Creating quotation:', quotation);
        const newQuotation = await QuotationService.createQuotation(quotation);
        if (newQuotation) {
            reply.code(201).send(newQuotation);
        } else {
            reply.code(500).send({ message: 'Failed to create quotation' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while creating quotation' });
    }
}

export const getAllQuotations = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    try {
        const quotations = await QuotationService.getAllQuotations();
        if (quotations) {
            reply.send(quotations);
        } else {
            reply.code(500).send({ message: 'Failed to get quotations' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while getting quotations' });
    }
}

export const getQuotationById = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
) => {
    try {
        const quotationId = request.params.id;
        const quotation = await QuotationService.getQuotationById(quotationId);
        if (quotation) {
            reply.send(quotation);
        } else {
            reply.code(404).send({ message: 'Quotation not found' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while getting quotation' });
    }
}

export const updateQuotation = async (
    request: FastifyRequest<UpdateQuotationRequest>,
    reply: FastifyReply,
) => {
    try {
        const quotationId = request.params.id;
        const quotation = request.body;
        const updatedQuotation = await QuotationService.updateQuotation(Number(quotationId), quotation);
        if (updatedQuotation) {
            reply.send(updatedQuotation);
        } else {
            reply.code(404).send({ message: 'Quotation not found' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while updating quotation' , "error": error.message});
    }
}

export const deleteQuotation = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
) => {
    try {
        const quotationId = request.params.id;
        const deletedQuotation = await QuotationService.deleteQuotation(quotationId);
        if (deletedQuotation) {
            reply.send(deletedQuotation);
        } else {
            reply.code(404).send({ message: 'Quotation not found' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while deleting quotation' });
    }
}

export const associateProduct = async (
    request: FastifyRequest<AssociateProductRequest>,
    reply: FastifyReply,
) => {
    try {
        const quotationId = request.params.id;
        const productId = request.body.product_id;
        const count = request.body.count;
        const associatedProduct = await QuotationService.associateProduct(quotationId, productId, count);
        if (associatedProduct) {
            reply.send(associatedProduct);
        } else {
            reply.code(404).send({ message: 'Product not found' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'Failed to associate product' });
    }
}

export const getQuotationByUserId = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
) => {
    try {
        const userId = request.params.id;
        const quotations = await QuotationService.findByUserId(userId);
        if (quotations) {
            reply.send(quotations);
        } else {
            reply.code(404).send({ message: 'Quotation not found' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while getting quotations by user ID' });
    }
}