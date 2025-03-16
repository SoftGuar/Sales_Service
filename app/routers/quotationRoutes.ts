import { FastifyInstance } from 'fastify';
import * as qh from '../handlers/quotationHandler';

async function quotationRoutes(fastify: FastifyInstance) {
  fastify.post('/', qh.createQuotation)
  fastify.get('/',qh.getAllQuotations)
  fastify.put('/:id', qh.updateQuotation)
  fastify.get('/:id', qh.getQuotationById)
  fastify.delete('/:id', qh.deleteQuotation)
  fastify.post('/associate/:id', qh.associateProduct)
  fastify.get('/user/:userId', qh.getQuotationByUserId)
}

export default quotationRoutes;
