import dispositiveService from "./dispositiveService";
import { TransactionService } from "./transactionService";

export interface OrderInput {
  product_id: number;
  user_id: number;
  commercial_id: number;
}

export const orderService = {
  /**
   * Places an order for a product, creates a transaction, and associates it with a dispositive.
   * @param {OrderInput} data - The order data, including product ID, user ID, and commercial ID.
   * @returns {Promise<object>} The created product transaction.
   * @throws {Error} With appropriate error messages for different failure scenarios.
   */
  order: async (data: OrderInput) => {
    // Validate input data
    if (!data.product_id || !data.user_id || !data.commercial_id) {
      throw new Error("Missing required order data");
    }

    try {
      // Find an available dispositive for the product
      const dispositive = await dispositiveService.findAvailableDispositive(Number(data.product_id));
      
      // Handle the case when no dispositive is available
      if (!dispositive) {
        const error = new Error("No available dispositive found for the product");
        error.name = "DispositiveMissingError";
        throw error;
      }
      if (isNaN(dispositive.id)) {
        throw new Error("No available dispositive found for the product");
    }
      // Create a transaction for the order with valid user connection
      const transaction = await TransactionService.createTransaction({
        user_id: data.user_id,
        commercial_id: data.commercial_id,
        date: new Date(),
      });

      // Verify transaction was created
      if (!transaction) {
        throw new Error("Failed to create transaction");
      }

      // Associate the dispositive with the transaction
      const productTransaction = await TransactionService.createProductTransaction({
        dispositive_id: Number(dispositive.id),
        transaction_id: transaction.id,
        
      });

      return productTransaction;
    } catch (error : any) {
      // Categorize errors for better error handling
      if (error.name === "DispositiveMissingError") {
        // Let this specific error pass through with its custom name
        throw error;
      } else if (error.message.includes("Argument `User` is missing")) {
        // Handle specific Prisma errors
        throw new Error("Transaction creation failed: User relation must be specified");
      } else {
        // Generic error handling
        console.error("Order processing error:", error);
        throw new Error(`Failed to process order: ${error.message}`);
      }
    }
  },
};