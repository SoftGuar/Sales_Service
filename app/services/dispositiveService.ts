import { error } from "console";
import dispositiveModel from "../models/dispositiveModel";
import { Dispositive } from "@prisma/client";

const dispositiveService = {
    /**
     * Finds an available dispositive for a specific product.
     * @param {number} product_id - The ID of the product to find an available dispositive for.
     * @returns {Promise<Dispositive>} The available dispositive object.
     * @throws {Error} If no available dispositive is found or an error occurs.
     */
    async findAvailableDispositive(product_id: number): Promise<Dispositive> {
        try {
            const dispositive = await dispositiveModel.findAvailableDispositive(product_id);
            if (!dispositive) {
                throw new Error("No available dispositive found for the product");
            }
            return dispositive;
        } catch (error:any) {
            throw new Error(`An error occurred while retrieving the dispositive: ${error.message}`);
        }
    },
};

export default dispositiveService;