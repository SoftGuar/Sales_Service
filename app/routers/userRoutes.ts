import { FastifyInstance } from 'fastify';
import * as um from '../handlers/userHandler';

async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/', um.createUser)
}

export default userRoutes;