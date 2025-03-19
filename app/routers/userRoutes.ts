import { FastifyInstance } from 'fastify';
import * as um from '../handlers/userHandler';

/**
 * Defines the routes for user-related operations.
 *
 * @param fastify - The Fastify instance used to register the routes.
 *
 * @remarks
 * This function registers a POST route at the root path (`/`) for creating a user.
 * The `um.createUser` handler is responsible for processing the request.
 *
 * @example
 * // Register the user routes in a Fastify instance
 * import fastify from 'fastify';
 * import { userRoutes } from './userRoutes';
 *
 * const app = fastify();
 * app.register(userRoutes);
 */
async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/', um.createUser)
  fastify.get('/', um.getUsers)
  fastify.get('/:id', um.getUserById)
}

export default userRoutes;