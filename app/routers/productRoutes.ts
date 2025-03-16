import { FastifyInstance } from 'fastify';
import * as pm from '../handlers/productHandler';

/**
 * Defines the routes for product-related operations in the application.
 * 
 * @param fastify - The Fastify instance used to register the routes.
 * 
 * @remarks
 * This function registers the following routes:
 * - `POST /` - Creates a new product.
 * - `GET /` - Retrieves all products.
 * - `PUT /:id` - Updates an existing product by its ID.
 * - `GET /:id` - Retrieves a product by its ID.
 * - `DELETE /:id` - Deletes a product by its ID.
 * 
 * Each route is handled by a corresponding method in the product manager (pm).
 */
async function productRoutes(fastify: FastifyInstance) {
  fastify.post('/', pm.createProduct)
  fastify.get('/',pm.getAllProducts)
  fastify.put('/:id', pm.updateProduct)
  fastify.get('/:id', pm.getProductById)
  fastify.delete('/:id', pm.deleteProduct)
}

export default productRoutes;
