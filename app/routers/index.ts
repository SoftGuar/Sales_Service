import { FastifyInstance } from 'fastify';
import productRoutes from './productRoutes';
import quotationRoutes from './quotationRoutes';
import transactionRoutes from './transactionRoutes';
import dispositiveRoutes from './dispositiveRoutes';
import orderRoutes from './orderRoutes';
/**
 * Registers all the application routes with the Fastify instance.
 *
 * This function is responsible for setting up the routes for various
 * modules of the application, each with its own prefix.
 *
 * @param fastify - The Fastify instance to which the routes will be registered.
 *
 * @remarks
 * The following routes are registered:
 * - `/products` for product-related operations.
 * - `/quotations` for quotation-related operations.
 * - `/transactions` for transaction-related operations.
 * - `/dispositives` for dispositive-related operations.
 * - `/order` for order-related operations.
 *
 * Ensure that the respective route handlers (`productRoutes`, `userRoutes`, etc.)
 * are properly imported and implemented before calling this function.
 */
export default async function registerRoutes(fastify:FastifyInstance) {
    fastify.register(productRoutes, { prefix: '/products' });
    fastify.register(quotationRoutes, { prefix: '/quotations' });
    fastify.register(transactionRoutes, { prefix: '/transactions' });
    fastify.register(dispositiveRoutes,{prefix:'/dispositives'});
    fastify.register(orderRoutes, { prefix: '/order' });
}
