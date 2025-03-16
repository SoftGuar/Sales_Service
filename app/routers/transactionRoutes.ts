import * as th from '../handlers/transactionHandler';
import { FastifyInstance } from 'fastify';

async function transactionRoutes(fastify: FastifyInstance) {
    fastify.post('/', th.createTransaction)
    fastify.get('/', th.getTransactions)
    fastify.put('/:id', th.updateTransaction)
    fastify.get('/:id', th.getTransactionById)
    fastify.delete('/:id', th.deleteTransaction)
}   
export default transactionRoutes;