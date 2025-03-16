import {orderHandler} from '../handlers/orderHandler';
import {FastifyInstance} from 'fastify';
async function orderRoutes(fastify:FastifyInstance){
    fastify.post('/',orderHandler);
}
export default orderRoutes;