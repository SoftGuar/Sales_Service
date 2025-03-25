import { Dispositive } from "@prisma/client";
import prisma from "../services/prismaService";

/**
 * Represents the dispositive model with methods to interact with dispositive data.
 */
const dispositiveModel = {
  /**
   * Finds the first available dispositive for a given product.
   *
   * @param {number} product_id - The ID of the product to find an available dispositive for.
   * @returns {Promise<Dispositive | null>} A promise that resolves to the first available dispositive object
   * or null if no dispositive is found or an error occurs.
   */
  async findAvailableDispositive(product_id: number): Promise<Dispositive | null> {
    try {
      return await prisma.dispositive.findFirst({
        where: { product_id, user_id: NaN },
      });
    } catch (error:any) {
      throw new Error(`An error occurred while retrieving the dispositive: ${error.message}`);
    }
  },
};
export default dispositiveModel;