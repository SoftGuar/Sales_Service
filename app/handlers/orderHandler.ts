import { orderService } from "../services/orderService";
import { FastifyRequest, FastifyReply } from "fastify";
// TODO: move this to an orderService
// before updating dispositive we first create quotation and once confirmed we create transaction
// then we create product transaction to link the dispositive to the transaction
// then we update the dispositive to assign it to the user
export interface OrderRequest {
    Body:{
        userId:number;
        product_id:number;
        commercial_id:number;
    }
}
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