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
    fastify.get('/sales',getSalesSchema, th.getSales);
}
export default transactionRoutes;
const getSalesSchema = {
    schema: {
        description: "Retrieves all sales details",
        tags: ["Sales"],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        userName: { type: "string", description: "The name of the user associated with the sale." },
                        commercialName: { type: "string", description: "The name of the commercial associated with the sale." },
                        date: { type: "string", format: "date-time", description: "The date and time of the sale in ISO 8601 format." },
                        dispositiveId: { type: "number", description: "The ID of the dispositive associated with the sale." },
                        Status: { type: "boolean", description: "The status of the sale." },
                    },
                },
            },
            500: {
                type: "object",
                properties: {
                    message: { type: "string", description: "Error message in case of failure." },
                },
            },
        },
    },
};
const createTransactionSchema = {
    schema: {
        description: "Creates a new transaction",
        tags: ["Transactions"],
        body: {
            type: 'object',
            required: ['user_id', 'commercial_id', 'date'],
            properties: {
                user_id: { type: 'number', description: 'The ID of the user associated with the transaction.' },
                commercial_id: { type: 'number', description: 'The ID of the commercial associated with the transaction.' },
                date: { type: 'string', format: 'date-time', description: 'The date and time of the transaction in ISO 8601 format.' }
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
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