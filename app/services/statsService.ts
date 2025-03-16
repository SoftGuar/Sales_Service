import { statsModel } from "../models/statsModel";
export const statsService = {
    async getVentes() {
        return await statsModel.getVentes();
    },
    async getVentesByCommercial() {
        return await statsModel.getVentesByCommercial();
    },
    async getVentesByDate() {
        return await statsModel.getVentesByDate();
    },
    async getVentesByCommercialAndDate() {
        return await statsModel.getVentesByCommercialAndDate();
    },
    async getVentesbyProduct() {
        return await statsModel.getVentesbyProduct();
    }
};
