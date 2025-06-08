import { FastifyInstance } from 'fastify';
import * as handler from '../handlers/dispositiveHandler';
import { CommonErrorResponses } from './baseSchema';

/**
 * Registers routes for dispositive-related operations.
 *
 * @param fastify - The Fastify instance used to define the routes.
 */
async function dispositiveRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/:product_id',schema,handler.getAvailableDispositive
    );
}

export default dispositiveRoutes;

const schema = {
    schema: {
        description: 'Retrieve an available dispositive for a specific product ID',
        tags: ['Dispositive'],
        params: {
            type: 'object',
            properties: {
                product_id: { 
                    type: 'number', 
                    description: 'The ID of the product'
                }
            },
            required: ['product_id']
        },
        response: {
            200: {
                description: 'Available dispositive details',
                type: 'object',
                properties: {
                    id: { type: 'number', description: 'Dispositive ID' },
                    type: { type: 'string', description: 'Type of the dispositive' },
                    start_date: { type: 'string', format: 'date-time', description: 'Start date of the dispositive' },
                    end_date: { type: 'string', format: 'date-time', description: 'End date of the dispositive' },
                    initial_state: { type: 'string', description: 'Initial state of the dispositive' },
                    MAC: { type: 'string', description: 'MAC address of the dispositive' },
                    state: { type: 'string', description: 'Current state of the dispositive' },
                    user_id: { type: 'number', nullable: true, description: 'ID of the associated user (if any)' },
                    product_id: { type: 'number', description: 'ID of the associated product' }
                }
            },
            400: {
                description: 'Dispositive not found for this product',
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            },
            500: {
                description: 'An error occurred while retrieving the dispositive',
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    error: { type: 'string' }
                }
            }
        }
    }
};
