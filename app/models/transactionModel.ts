import prisma from "../services/prismaService";

export interface CreateTransactionInput {
  user_id: number;
  commercial_id: number;
}
export interface ProductTransactionInput {
  dispositive_id: number;
  transaction_id: number;
}
export interface UpdateTransactionInput {
  user_id?: number;
  commercial_id?: number;
}

export const transactionModel = {
  async createTransaction(data: CreateTransactionInput) {
    try {
      return await prisma.transaction.create({ data });
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  },
  async getTransactions() {
    try {
      return await prisma.transaction.findMany();
    } catch (error) {
      console.error("Error getting transactions:", error);
      throw error;
    }
  },
  async getTransactionById(id: number) {
    try {
      return await prisma.transaction.findUnique({ where: { id } });
    } catch (error) {
      console.error("Error getting transaction by ID:", error);
      throw error;
    }
  },
  async updateTransaction(id: number, data: UpdateTransactionInput) {
    try {
      return await prisma.transaction.update({ where: { id }, data });
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  },
  async deleteTransaction(id: number) {
    try {
      return await prisma.transaction.delete({ where: { id } });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
  },
  async createProductTransaction(data: ProductTransactionInput) {
    try {
      const dispositive_id = Number(data.dispositive_id);
      const transaction_id = Number(data.transaction_id);
      return await prisma.productTransaction.create({
        data: { dispositive_id, transaction_id },
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  },
  async getSales(): Promise<
    {
      userName: string;
      commercialName: string;
      date: Date;
      dispositiveId: number;
      Status: boolean;
    }[]
  > {
    try {
      const sales = await prisma.productTransaction.findMany({
        include: {
          Transaction: {
            include: {
              User: true,
              Commercial: true,
            },
          },
          Dispositive: true,
        },
      });
      const salesWithDetails = sales.map((sale) => {
        return {
          userName:
            sale.Transaction.User.first_name +
            " " +
            sale.Transaction.User.last_name,
          commercialName:
            sale.Transaction.Commercial.first_name +
            " " +
            sale.Transaction.Commercial.last_name,
          date: sale.created_at,
          dispositiveId: sale.Dispositive.id,
          Status: sale.isConfirmed,
        };
      });
      return salesWithDetails;
    } catch (error: any) {
      console.error("Error getting sales:", error);
      throw error;
    }
  },

  async confirmProductTransaction(
    transaction_id: number,
    dispositive_id: number,
  ) {
    const productTransactionId = Number(transaction_id);
    const dispositiveId = Number(dispositive_id);
    try {
      const updatedProductTransaction = await prisma.productTransaction.update({
        where: {
          transaction_id_dispositive_id: {
            transaction_id: productTransactionId,
            dispositive_id: dispositiveId,
          },
        },
        data: {
          isConfirmed: true,
        },
      });
      return updatedProductTransaction;
    } catch (error: any) {
      console.error("Error updating product transaction:", error);
      throw error;
    }
  },
};
