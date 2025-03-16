import {productService} from '../services/productService';
import { CreateProduct ,UpdateProductInput} from '../models/productModel';
import { FastifyRequest, FastifyReply } from 'fastify';

interface CreateProductRequest {
    Body: CreateProduct;
}
interface UpdateProductRequest {
    Params: { id: number };
    Body: UpdateProductInput;
}

export const createProduct = async (
    request : FastifyRequest<CreateProductRequest>,
    reply: FastifyReply, 
    ) => {    
    const product = request.body;
    reply.log.info('Creating product:', product);
    const newProduct = await productService.createProduct(product);
    if (newProduct) {
        reply.code(201).send(newProduct);
    } else {
        reply.code(500).send({ message: 'Failed to create product' });
    }
};
export const getAllProducts = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const products = await productService.getAllProducts();
    if (products) {
        reply.send(products);
    }
    else {
        reply.code(500).send({ message: 'Failed to get products' });
    }
};

export const getProductById = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
) => {
    const productId = request.params.id;
    const product = await productService.getProductById(productId);
    if (product) {
        reply.send(product);
    } else {
        reply.code(404).send({ message: 'Product not found' });
    }
};

export const updateProduct = async (
    request: FastifyRequest<UpdateProductRequest>,
    reply: FastifyReply,
) => {
    const productId = request.params.id;
    const product = request.body;
    const updatedProduct = await productService.updateProduct(productId, product);
    if (updatedProduct) {
        reply.send(updatedProduct);
    } else {
        reply.code(404).send({ message: 'Product not found' });
    }
};

export const deleteProduct = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
) => {
    const productId = request.params.id;
    const deletedProduct = await productService.deleteProduct(productId);
    if (deletedProduct) {
        reply.send(deletedProduct);
    } else {
        reply.code(404).send({ message: 'Product not found' });
    }
};
