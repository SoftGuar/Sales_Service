import { FastifyInstance } from 'fastify';
import * as pm from '../handlers/productHandler';

/**
 * Defines the routes for product-related operations in the application.
 * 
 * @param fastify - The Fastify instance used to register the routes.
 * 
 * @remarks
 * This function registers the following routes:
 * - `GET /` - Retrieves all products.
 * - `GET /:id` - Retrieves a product by its ID.
 * 
 * Each route is handled by a corresponding method in the product manager (pm).
 */
async function productRoutes(fastify: FastifyInstance) {
  fastify.get('/',getAllProductsSchema,pm.getAllProducts)
  fastify.get('/:id',getProductByIdSchema, pm.getProductById)
}

export default productRoutes;
const getAllProductsSchema = {
  schema:{
    description: 'Get all products',
    tags: ['Products'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          description: { type: 'string', nullable: true },
          price: { type: 'number' },
        },
        required: ['id', 'name', 'price'],
      },
    },
  },
}
};

const getProductByIdSchema = {
  schema:{
    description: 'Get a product by ID',
    tags: ['Products'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        description: { type: 'string', nullable: true },
        price: { type: 'number' },
      },
      required: ['id', 'name', 'price'],
    },
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
      required: ['message', 'error'],
    },
  },
}
};
