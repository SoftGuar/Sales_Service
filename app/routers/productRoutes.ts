import { FastifyInstance } from 'fastify';
import * as pm from '../handlers/productHandler';

async function productRoutes(fastify: FastifyInstance) {
  fastify.post('/', pm.createProduct)
  fastify.get('/',pm.getAllProducts)
  fastify.put('/:id', pm.updateProduct)
  fastify.get('/:id', pm.getProductById)
  fastify.delete('/:id', pm.deleteProduct)
}

export default productRoutes;
