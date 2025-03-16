import { FastifyInstance } from 'fastify';
import productRoutes from './productRoutes';
import userRoutes from './userRoutes';
import quotationRoutes from './quotationRoutes';
import transactionRoutes from './transactionRoutes';
import dispositiveRoutes from './dispositiveRoutes';
import orderRoutes from './orderRoutes';
export default async function registerRoutes(fastify:FastifyInstance) {
    fastify.register(productRoutes, { prefix: '/products' });
    fastify.register(userRoutes, { prefix: '/users' });
    fastify.register(quotationRoutes, { prefix: '/quotations' });
    fastify.register(transactionRoutes, { prefix: '/transactions' });
    fastify.register(dispositiveRoutes,{prefix:'/dispositives'});
    fastify.register(orderRoutes, { prefix: '/order' });
}
