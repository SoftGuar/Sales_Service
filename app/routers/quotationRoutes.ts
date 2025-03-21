import { FastifyInstance } from 'fastify';
import * as qh from '../handlers/quotationHandler';

/**
 * Registers the routes for managing quotations in the Fastify application.
 *
 * @param fastify - The Fastify instance to which the routes will be added.
 *
 * ### Routes:
 * - `POST /` - Creates a new quotation. Handled by `qh.createQuotation`.
 * - `GET /` - Retrieves all quotations. Handled by `qh.getAllQuotations`.
 * - `PUT /:id` - Updates an existing quotation by its ID. Handled by `qh.updateQuotation`.
 * - `GET /:id` - Retrieves a specific quotation by its ID. Handled by `qh.getQuotationById`.
 * - `DELETE /:id` - Deletes a specific quotation by its ID. Handled by `qh.deleteQuotation`.
 * - `POST /associate/:id` - Associates a product with a quotation by its ID. Handled by `qh.associateProduct`.
 * - `GET /user/:userId` - Retrieves all quotations associated with a specific user ID. Handled by `qh.getQuotationByUserId`.
 *
 * Ensure that the appropriate handlers (`qh`) are implemented and imported before using this function.
 */
async function quotationRoutes(fastify: FastifyInstance) {
  fastify.post('/', qh.createQuotation)
  fastify.get('/',qh.getAllQuotations)
  fastify.put('/:id', qh.updateQuotation)
  fastify.get('/:id', qh.getQuotationById)
  fastify.delete('/:id', qh.deleteQuotation)
  fastify.post('/associate/:id', qh.associateProduct)
  fastify.get('/user/:user_id', qh.getQuotationByUserId)
  fastify.post('/demande', qh.demandeQuotation)
}

export default quotationRoutes;
