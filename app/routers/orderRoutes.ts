import {orderHandler} from '../handlers/orderHandler';
import {FastifyInstance} from 'fastify';
/**
 * Registers the order-related routes for the Fastify application.
 *
 * @param fastify - The Fastify instance to which the routes will be added.
 *
 * @remarks
 * This function defines the routes related to order operations and registers
 * them with the provided Fastify instance. Currently, it includes a POST route
 * for handling order-related requests.
 */
async function orderRoutes(fastify:FastifyInstance){
    fastify.post('/',schema,orderHandler);
}
export default orderRoutes;

const schema = {
    schema: {
        description: 'Create an order with the specified details',
        tags: ['Order'],
        body: {
            type: 'object',
            properties: {
                user_id: { 
                    type: 'number', 
                    description: 'The ID of the user placing the order' 
                },
                product_id: { 
                    type: 'number', 
                    description: 'The ID of the product to be ordered' 
                },
                commercial_id: { 
                    type: 'number', 
                    description: 'The ID of the commercial entity associated with the order' 
                }
            },
            required: ['user_id', 'product_id', 'commercial_id']
        },
        response: {
            200: {
                description: 'Order created successfully',
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    data: { 
                        type: 'object',
                        properties: {
                            id: { type: 'number', description: 'The ID of the created order' },
                            transaction_id: { type: 'number', description: 'The ID of the transaction created' },
                            dispositive_id: { type: 'number', description: 'The ID of the dispositive associated with the product' },
                            isConfirmed: { type: 'boolean', description: 'Whether the product transaction is confirmed' },                        }
                    }
                }
            },
            400: {
                description: 'Missing or invalid fields in the request',
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    details: { type: 'string' }
                }
            },
            404: {
                description: 'No available dispositive found for the product',
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    error: { type: 'string' }
                }
            },
            500: {
                description: 'An error occurred while processing the order',
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    error: { type: 'string' }
                }
            }
        }
    }
};
