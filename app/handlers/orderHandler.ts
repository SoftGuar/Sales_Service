import { orderService } from "../services/orderService";
import { FastifyRequest, FastifyReply } from "fastify";
export interface OrderRequest {
    Body:{
        userId:number;
        product_id:number;
        commercial_id:number;
    }
}
/**
 * Handles the creation of an order.
 *
 * @param request - The Fastify request object containing the order details.
 * @param request.body.product_id - The ID of the product to be ordered.
 * @param request.body.userId - The ID of the user placing the order.
 * @param request.body.commercial_id - The ID of the commercial entity associated with the order.
 * @param reply - The Fastify reply object used to send the response.
 *
 * @returns A response indicating the success or failure of the order creation process.
 *
 * @throws Will send a 500 status code if an error occurs during the order creation process.
 */
export const orderHandler= async (
    request: FastifyRequest<OrderRequest>,reply: FastifyReply,) => {
    const productId = Number(request.body.product_id)
    const userId = Number(request.body.userId);
    const commercialId = Number(request.body.commercial_id);
    try {
        orderService.order({user_id:userId,product_id:productId,commercial_id:commercialId});
        reply.code(201).send({ message: 'Order created successfully' });
    } catch (error: any) {
        reply.code(500).send({ message: 'An error occurred while ordering dispositive', error: error.message });
    }
};