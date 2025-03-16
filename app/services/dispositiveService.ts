import { error } from "console";
import dispositiveModel from "../models/dispositiveModel";

const dispositiveService = {
    /**
     * Retrieves all dispositives from the database.
     * @returns {Promise<Array>} An array of dispositive objects, or an empty array if an error occurs.
     */
    async getAllDispositives(): Promise<Array<any>> {
        try {
            
          const result= await dispositiveModel.getAllDispositives();
          if (result==null){
           throw error("No dispositives found");
          }
          return result;
        } catch (error) {
            console.error("Failed to get dispositives:", error);
            return []; // Return an empty array in case of an error
        }
    },

    /**
     * Finds an available dispositive for a specific product.
     * @param {number} product_id - The ID of the product to find an available dispositive for.
     * @returns {Promise<Object>} The available dispositive object.
     * @throws {Error} If no available dispositive is found or an error occurs.
     */
    async findAvailableDispositive(product_id: number): Promise<any> {
        try {
            const dispositive = await dispositiveModel.findAvailableDispositive(product_id);
            if (!dispositive) {
                throw new Error("No available dispositive found for the product");
            }
            return dispositive;
        } catch (error) {
            console.error("Failed to get dispositive:", error);
            return [];
        }
    },
};

export default dispositiveService;