import { TransactionService } from "../services/transactionService";
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateTransactionInput,UpdateTransactionInput ,ProductTransactionInput} from "../models/transactionModel";

interface CreateTransactionRequest{
    Body: CreateTransactionInput;
}
interface UpdateTransactionRequest{
    Params: { id: number };
    Body: UpdateTransactionInput;
}
interface ProductTransactionRequest{
   Body: ProductTransactionInput;
}
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
export const getTransactionById = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
) => {
    try {
        const transactionId = request.params.id;
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
export const updateTransaction = async (
    request: FastifyRequest<UpdateTransactionRequest>,
    reply: FastifyReply,
) => {
    try {
        const transactionId = request.params.id;
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
export const deleteTransaction = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
) => {
    try {
        const transactionId = request.params.id;
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
export const createProductTransaction = async (
    request: FastifyRequest<ProductTransactionRequest>,reply: FastifyReply,) => {
    const data = request.body;
    try {     
        const productTransaction = await TransactionService.createProductTransaction(data);
        if (productTransaction) {
            reply.send(productTransaction);
        } else {
            reply.code(500).send({ message: 'An error occurred while creating product transaction' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while creating product transaction', error: error.message });
    }
};