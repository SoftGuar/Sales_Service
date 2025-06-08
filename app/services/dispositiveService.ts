import dispositiveModel from '../models/dispositiveModel';
import { Dispositive } from '@prisma/client';
import { DispositiveNotFoundError, DispositiveRetrievalError } from '../errors/DispositiveErrors';

const dispositiveService = {
  /**
   * Finds an available dispositive for a specific product.
   * @param {number} product_id - The ID of the product to find an available dispositive for.
   * @returns {Promise<Dispositive>} The available dispositive object.
   * @throws {DispositiveNotFoundError} If no available dispositive is found.
   * @throws {DispositiveRetrievalError} On other retrieval errors.
   */
  async findAvailableDispositive(product_id: number): Promise<Dispositive> {
    try {
      const dispositive = await dispositiveModel.findAvailableDispositive(product_id);
      if (!dispositive) {
        throw new DispositiveNotFoundError(product_id);
      }
      return dispositive;
    } catch (err: any) {
      if (err instanceof DispositiveNotFoundError) {
        throw err;
      }
      throw new DispositiveRetrievalError(product_id, err);
    }
  },
};

export default dispositiveService;
