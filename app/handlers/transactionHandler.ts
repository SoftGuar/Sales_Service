import { TransactionService } from "../services/transactionService";
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateTransactionInput, UpdateTransactionInput, ProductTransactionInput} from "../models/transactionModel";
import { request } from "http";

/**
 * Interface defining the structure of a request to create a transaction.
 */
export interface CreateTransactionRequest {
    Body: CreateTransactionInput;
}

/**
 * Interface defining the structure of a request to update a transaction.
 */
export interface UpdateTransactionRequest {
    Params: { id: number };
    Body: UpdateTransactionInput;
}

/**
 * Interface defining the structure of a request to create a product transaction.
 */
export interface ProductTransactionRequest {
    Body: ProductTransactionInput;
}
export interface ProductTransactionUpdateRequest {
    Params: { transaction_id: number; dispositive_id: number };
}

/**
 * Handles the creation of a new transaction.
 * 
 * @param request - The Fastify request object containing the transaction data.
 * @param reply - The Fastify reply object used to send the response.
 * @returns A response with the newly created transaction or an error message.
 */
export const createTransaction = async (
    request: FastifyRequest<CreateTransactionRequest>,
    reply: FastifyReply,
) => {
        const transaction = request.body;
        reply.log.info('Creating transaction:', transaction);
        const newTransaction = await TransactionService.createTransaction(transaction);
        if (newTransaction) {
            reply.code(201).send({transaction: newTransaction});
        } else {
            reply.code(500).send({ message: 'Failed to create transaction' });
        }
}

/**
 * Handles the retrieval of all transactions.
 * 
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object used to send the response.
 * @returns A response with the list of transactions or an error message.
 */
export const getTransactions = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
        const transactions = await TransactionService.getTransactions();
        if (transactions) {
            reply.send(transactions);
        } else {
            reply.code(500).send({ message: 'Failed to get transactions' });
        }
}

/**
 * Handles the retrieval of a specific transaction by its ID.
 * 
 * @param request - The Fastify request object containing the transaction ID.
 * @param reply - The Fastify reply object used to send the response.
 * @returns A response with the requested transaction or an error message.
 */
export const getTransactionById = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
) => {
        const transactionId = Number(request.params.id);
        const transaction = await TransactionService.getTransactionById(transactionId);
        reply.send(transaction);
}

/**
 * Handles the update of an existing transaction.
 * 
 * @param request - The Fastify request object containing the transaction ID and updated data.
 * @param reply - The Fastify reply object used to send the response.
 * @returns A response with the updated transaction or an error message.
 */
export const updateTransaction = async (
    request: FastifyRequest<UpdateTransactionRequest>,
    reply: FastifyReply,
) => {
        const transactionId = Number(request.params.id);
        const transaction = request.body;
        reply.log.info('Updating transaction:', transaction);
        const updatedTransaction = await TransactionService.updateTransaction(transactionId, transaction);
        if (updatedTransaction) {
            reply.send(updatedTransaction);
        } else {
            reply.code(500).send({ message: 'Failed to update transaction' });
        }
}

/**
 * Handles the deletion of a transaction by its ID.
 * 
 * @param request - The Fastify request object containing the transaction ID.
 * @param reply - The Fastify reply object used to send the response.
 * @returns A response confirming the deletion or an error message.
 */
export const deleteTransaction = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
) => {
        const transactionId = Number(request.params.id);
        const deletedTransaction = await TransactionService.deleteTransaction(transactionId);
        if (deletedTransaction) {
            reply.send(deletedTransaction);
        } else {
            reply.code(500).send({ message: 'Failed to delete transaction' });
        }
}

/**
 * Handles the retrieval of sales details.
 * 
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object used to send the response.
 * @returns A response with the list of sales details or an error message.
 */
export const getSales = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
        const sales = await TransactionService.getSales();
        if (sales) {
            reply.code(200).send(sales);
        } else {
            reply.code(500).send({ message: 'Failed to get sales details' });
        }
}

export const confirmProductTransaction= async (
    request: FastifyRequest<ProductTransactionUpdateRequest>,
    reply: FastifyReply,
)=>{
        const transactionId = Number(request.params.transaction_id);
        const dispositiveId = Number(request.params.dispositive_id);
        const updatedTransaction = await TransactionService.confirmProductTransaction(transactionId,  dispositiveId);
        if (updatedTransaction) {
            reply.code(200).send(updatedTransaction);
        } else {
            reply.code(500).send({ message: 'Failed to update product transaction' });
        }
}