import {FastifyInstance} from 'fastify';
import * as handler from '../handlers/dispositiveHandler';

async function dispositiveRoutes (fastify: FastifyInstance){
    fastify.get('/', handler.getAllDispositives);
    fastify.get('/:product_id', handler.getAvailableDispositive);
}

export default dispositiveRoutes;