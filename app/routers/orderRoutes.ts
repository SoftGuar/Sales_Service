import {orderHandler} from '../handlers/orderHandler';
import {FastifyInstance} from 'fastify';
/**
 * Registers the order-related routes for the Fastify application.
 *
 * @param fastify - The Fastify instance to which the routes will be added.
 *
 * @remarks
 * This function defines the routes related to order operations and registers
 * them with the provided Fastify instance. Currently, it includes a POST route
 * for handling order-related requests.
 *
 * @example
 * ```typescript
 * import fastify from 'fastify';
 * import orderRoutes from './orderRoutes';
 *
 * const app = fastify();
 * orderRoutes(app);
 * app.listen(3000, () => {
 *   console.log('Server is running on port 3000');
 * });
 * ```
 */
async function orderRoutes(fastify:FastifyInstance){
    fastify.post('/',orderHandler);
}
export default orderRoutes;