import { TransactionService } from "../services/transactionService";
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateTransactionInput, UpdateTransactionInput, ProductTransactionInput } from "../models/transactionModel";

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
    try {
        const transaction = request.body;
        reply.log.info('Creating transaction:', transaction);
        const newTransaction = await TransactionService.createTransaction(transaction);
        if (newTransaction) {
            reply.code(201).send(newTransaction);
        } else {
            reply.code(500).send({ message: 'Failed to create transaction' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while creating transaction' });
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
    try {
        const transactions = await TransactionService.getTransactions();
        if (transactions) {
            reply.send(transactions);
        } else {
            reply.code(500).send({ message: 'Failed to get transactions' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while getting transactions' });
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
    try {
        const transactionId = Number(request.params.id);
        const transaction = await TransactionService.getTransactionById(transactionId);
        if (transaction) {
            reply.send(transaction);
        } else {
            reply.code(500).send({ message: 'Failed to get transaction' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while getting transaction' });
    }
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
    try {
        const transactionId = Number(request.params.id);
        const transaction = request.body;
        reply.log.info('Updating transaction:', transaction);
        const updatedTransaction = await TransactionService.updateTransaction(transactionId, transaction);
        if (updatedTransaction) {
            reply.send(updatedTransaction);
        } else {
            reply.code(500).send({ message: 'Failed to update transaction' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while updating transaction' });
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
    try {
        const transactionId = Number(request.params.id);
        const deletedTransaction = await TransactionService.deleteTransaction(transactionId);
        if (deletedTransaction) {
            reply.send(deletedTransaction);
        } else {
            reply.code(500).send({ message: 'Failed to delete transaction' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while deleting transaction' });
    }
}
