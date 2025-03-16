import {FastifyInstance} from 'fastify';
import * as handler from '../handlers/dispositiveHandler';

/**
 * Registers routes for dispositive-related operations.
 *
 * @param fastify - The Fastify instance used to define the routes.
 *
 * @remarks
 * This function sets up the following routes:
 * - `GET /`: Retrieves all dispositives using the `getAllDispositives` handler.
 * - `GET /:product_id`: Retrieves available dispositives for a specific product ID using the `getAvailableDispositive` handler.
 *
 * @example
 * // Register the routes in a Fastify instance
 * import fastify from 'fastify';
 * import { dispositiveRoutes } from './dispositiveRoutes';
 *
 * const app = fastify();
 * app.register(dispositiveRoutes);
 */
async function dispositiveRoutes (fastify: FastifyInstance){
    fastify.get('/', handler.getAllDispositives);
    fastify.get('/:product_id', handler.getAvailableDispositive);
}

export default dispositiveRoutes;