import { orderService } from "../services/orderService";
import { FastifyRequest, FastifyReply } from "fastify";

export interface OrderRequest {
    Body: {
        user_id: number;
        product_id: number;
        commercial_id: number;
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
 */
export const orderHandler = async (
    request: FastifyRequest<OrderRequest>,
    reply: FastifyReply
) => {
    // Input validation
    if (!request.body.product_id || !request.body.user_id || !request.body.commercial_id) {
        return reply.code(400).send({ 
            message: 'Missing required fields', 
            details: 'product_id, userId, and commercial_id are required' 
        });
    }

    const productId = Number(request.body.product_id);
    const userId = Number(request.body.user_id);
    const commercialId = Number(request.body.commercial_id);
    // Validate numeric values
    if (isNaN(productId) || isNaN(userId) || isNaN(commercialId)) {
        return reply.code(400).send({ 
            message: 'Invalid input values', 
            details: 'product_id, userId, and commercial_id must be valid numbers' 
        });
    }

    try {
        // Make sure to await the async operation
        const result = await orderService.order({
            user_id: userId,
            product_id: productId,
            commercial_id: commercialId
        });

        return reply.code(201).send({ 
            message: 'Order created successfully',
            data: result
        });
    } catch (error: any) {
        // Handle specific error types
        if (error.name === 'DispositiveMissingError' || error.message.includes('No available dispositive')) {
            return reply.code(404).send({ 
                message: 'No available dispositive found for this product',
                error: error.message
            });
        } else if (error.message.includes('User relation') || error.message.includes('Argument `User` is missing')) {
            return reply.code(400).send({ 
                message: 'Invalid user information',
                error: error.message
            });
        } else if (error.message.includes('Failed to create transaction')) {
            return reply.code(500).send({ 
                message: 'Transaction creation failed',
                error: error.message
            });
        }

        // Log unexpected errors
        console.error('Order handler error:', error);
        
        // Generic error response
        return reply.code(500).send({ 
            message: 'An error occurred while processing your order', 
            error: error.message 
        });
    }
};