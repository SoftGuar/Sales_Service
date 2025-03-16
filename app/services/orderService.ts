import dispositiveService from "./dispositiveService";
import { TransactionService } from "./transactionService";
import { QuotationService } from "./quotationService";
import { productService } from "./productService";

export interface OrderInput {
  product_id: number;
  user_id: number;
  commercial_id: number;
}

export const orderService = {
  /**
   * Places an order for a product, creates a transaction, and associates it with a dispositive.
   * @param {OrderInput} data - The order data, including product ID, user ID, and commercial ID.
   * @returns {Promise<void>} Resolves if the order is successfully placed.
   * @throws {Error} If no available dispositive is found, or if the transaction or product transaction creation fails.
   */
  order: async (data: OrderInput): Promise<void> => {
    try {
      // Find an available dispositive for the product
      const dispositive = await dispositiveService.findAvailableDispositive(Number(data.product_id));
      if (!dispositive) {
        throw new Error("No available dispositive found");
      }

      // Create a transaction for the order
      const transaction = await TransactionService.createTransaction({
        user_id: data.user_id,
        commercial_id: data.commercial_id,
        date: new Date(),
      });
      if (!transaction) {
        throw new Error("Failed to create transaction");
      }

      // Associate the dispositive with the transaction
      const productTransaction = await TransactionService.createProductTransaction({
        dispositive_id: Number(dispositive?.id),
        transaction_id: transaction.id,
      });

      // TODO: Send the product transaction to the admin service to update the dispositive status
    } catch (e) {
      throw e; // Re-throw the error for the caller to handle
    }
  },
};