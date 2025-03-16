import prisma from "../services/prismaService";

/**
 * Represents the dispositive model with methods to interact with dispositive data.
 */
const dispositiveModel = {
  /**
   * Retrieves all dispositives from the database.
   *
   * @returns {Promise<Array>} A promise that resolves to an array of dispositives.
   * If an error occurs, it logs the error and returns an empty array.
   */
  async getAllDispositives(): Promise<Array<any>> {
    try { 
      const result= await prisma.dispositive.findMany();
      if (result==null){
        return [];
      }
      return result;
    } catch (error) {
      console.error("Failed to get dispositives:", error);
      return [];
    }
  },
  /**
   * Finds the first available dispositive for a given product.
   *
   * @param {number} product_id - The ID of the product to find an available dispositive for.
   * @returns {Promise<Object | null>} A promise that resolves to the first available dispositive object
   * or null if no dispositive is found or an error occurs.
   */
  async findAvailableDispositive(product_id: number): Promise<object | null> {
    try {
      return await prisma.dispositive.findFirst({
        where: { product_id, user_id: NaN },
      });
    } catch (error) {
      console.error("Failed to get dispositives:", error); 
      return null;
    }
  },
};
export default dispositiveModel;