// src/models/dispositiveModel.ts
import { Dispositive } from '@prisma/client';
import prisma from '../services/prismaService';
import { DispositiveQueryError } from '../errors/DispositiveErrors';

const dispositiveModel = {
  async findAvailableDispositive(product_id: number): Promise<Dispositive | null> {
    try {
      return await prisma.dispositive.findFirst({
        where: { product_id, user_id: NaN },
      });
    } catch (err: any) {
      throw new DispositiveQueryError(product_id, err);
    }
  },
};

export default dispositiveModel;
