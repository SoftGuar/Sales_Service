// src/services/orderService.ts
import { ProductTransaction } from '@prisma/client';
import dispositiveService from './dispositiveService';
import { TransactionService } from './transactionService';
import {
  NoAvailableDispositiveError,
  InvalidUserError,
  TransactionCreationError,
  OrderProcessingError
} from '../errors/OrderErrors';

export interface OrderInput {
  product_id: number;
  user_id: number;
  commercial_id: number;
}

export const orderService = {
  async order(data: OrderInput): Promise<ProductTransaction> {
    try {
      const dispositive = await dispositiveService.findAvailableDispositive(data.product_id);
      const transaction = await TransactionService.createTransaction({
        user_id: data.user_id,
        commercial_id: data.commercial_id
      });
      if (!transaction) {
        throw new TransactionCreationError({ data });
      }
      return await TransactionService.createProductTransaction({
        dispositive_id: dispositive.id,
        transaction_id: transaction.id
      });
    } catch (err: any) {
      if (err instanceof NoAvailableDispositiveError) throw err;
      if (err.message.includes('User relation') || err.message.includes('Argument `User` is'))
        throw new InvalidUserError(data.user_id);
      if (err instanceof TransactionCreationError) throw err;
      throw new OrderProcessingError(err);
    }
  }
};
