import * as th from '../handlers/transactionHandler';
import { FastifyInstance } from 'fastify';

/**
 * Defines the routes for handling transaction-related operations.
 * 
 * @param fastify - The Fastify instance used to register the routes.
 * 
 * @remarks
 * This function registers the following routes:
 * - `POST /` - Creates a new transaction.
 * - `GET /` - Retrieves a list of all transactions.
 * - `PUT /:id` - Updates an existing transaction by its ID.
 * - `GET /:id` - Retrieves a specific transaction by its ID.
 * - `DELETE /:id` - Deletes a transaction by its ID.
 */
async function transactionRoutes(fastify: FastifyInstance) {
    fastify.post('/', th.createTransaction)
    fastify.get('/', th.getTransactions)
    fastify.put('/:id', th.updateTransaction)
    fastify.get('/:id', th.getTransactionById)
    fastify.delete('/:id', th.deleteTransaction)
}   
export default transactionRoutes;