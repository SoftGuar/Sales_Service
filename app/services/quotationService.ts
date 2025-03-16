// app/services/userService.ts
import { create } from 'domain';
import * as quotationModel from '../models/quotationModel';

export const QuotationService = {
    createQuotation: async (data : quotationModel.CreateQuotationInput) => {
        return quotationModel.QuotationModel.create(data);
    },

    getQuotationById: async (id:number) => {
        return quotationModel.QuotationModel.findById(id);
    },

    getAllQuotations: async () => {
        return quotationModel.QuotationModel.getAll();
    },

    updateQuotation: async (id:number, data:quotationModel.UpdateQuotationInput) => {
        return quotationModel.QuotationModel.update(id,data);
    },

    deleteQuotation: async (id:number) => {
        return quotationModel.QuotationModel.delete(id);
    },
    associateProduct: async (quotationId:number, productId:number,count:number) => {
        return quotationModel.QuotationModel.associateProduct(quotationId,productId,count );
    },
    findByUserId: async (userId:number) => {
        return quotationModel.QuotationModel.findByUserId(userId);
    },
    demandeQuotation: async(
            user_id : number,
            products : {product_id:number, count:number}[]
        ) => {
            const quotation= await quotationModel.QuotationModel.create({
                user_id,date: new Date()
            })
            // for each product in products
            // call associateProduct
            for (let product of products) {
                await quotationModel.QuotationModel.associateProduct(
                    quotation.id,
                    product.product_id,
                    product.count
                );
            }
            
    },
    
};