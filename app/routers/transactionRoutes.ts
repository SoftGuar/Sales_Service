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
    fastify.post('/', createTransactionSchema, th.createTransaction);
    fastify.get('/', getAllTransactionsSchema, th.getTransactions);
    fastify.put('/:id', updateTransactionSchema, th.updateTransaction);
    fastify.get('/:id', getTransactionByIdSchema, th.getTransactionById);
    fastify.delete('/:id', deleteTransactionSchema, th.deleteTransaction);
}
export default transactionRoutes;

const createTransactionSchema = {
    schema: {
        description: "Creates a new transaction",
        tags: ["Transactions"],
        body: {
            type: "object",
            properties: {
                user_id: { type: "number" },
                commercial_id: { type: "number" },
                processed: { type: "boolean", default: false },
                date: { type: "string", format: "date-time" },
            },
            required: ["user_id", "commercial_id", "date"],
        },
        response: {
            201: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    transaction: {
                        type: "object",
                        properties: {
                            id: { type: "number" },
                            user_id: { type: "number" },
                            commercial_id: { type: "number" },
                            processed: { type: "boolean" },
                            date: { type: "string", format: "date-time" },
                        },
                    },
                },
            },
        },
    },
};

const getAllTransactionsSchema = {
    schema: {
        description: "Retrieves all transactions",
        tags: ["Transactions"],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "number" },
                        user_id: { type: "number" },
                        commercial_id: { type: "number" },
                        processed: { type: "boolean" },
                        date: { type: "string", format: "date-time" },
                    },
                },
            },
        },
    },
};

const updateTransactionSchema = {
    schema: {
        description: "Updates an existing transaction by its ID",
        tags: ["Transactions"],
        params: {
            type: "object",
            properties: {
                id: { type: "number" },
            },
            required: ["id"],
        },
        body: {
            type: "object",
            properties: {
                user_id: { type: "number" },
                commercial_id: { type: "number" },
                processed: { type: "boolean" },
                date: { type: "string", format: "date-time" },
            },
            required: ["user_id", "commercial_id", "processed", "date"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: { type: "number" },
                    user_id: { type: "number" },
                    commercial_id: { type: "number" },
                    processed: { type: "boolean" },
                    date: { type: "string", format: "date-time" },
                },
            },
        },
    },
};

const getTransactionByIdSchema = {
    schema: {
        description: "Retrieves a specific transaction by its ID",
        tags: ["Transactions"],
        params: {
            type: "object",
            properties: {
                id: { type: "number" },
            },
            required: ["id"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: { type: "number" },
                    user_id: { type: "number" },
                    commercial_id: { type: "number" },
                    processed: { type: "boolean" },
                    date: { type: "string", format: "date-time" },
                },
            },
        },
    },
};

const deleteTransactionSchema = {
    schema: {
        description: "Deletes a specific transaction by its ID",
        tags: ["Transactions"],
        params: {
            type: "object",
            properties: {
                id: { type: "number" },
            },
            required: ["id"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                },
            },
        },
    },
};