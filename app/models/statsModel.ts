import { get } from "http";
import prisma from "../services/prismaService";

export const statsModel = {
  getVentes(){
    return prisma.transaction.count();
  },
  getVentesByCommercial(){
    return prisma.transaction.groupBy({
      by: ['commercial_id'],
      _count: {
        id: true
      }
    });
  },
  getVentesByDate(){
    return prisma.transaction.groupBy({
      by: ['date'],
      _count: {
        id: true
      }
    });
  },
  getVentesByCommercialAndDate(){
    return prisma.transaction.groupBy({
      by: ['date','commercial_id'],
      _count: {
        id: true
      }
    });
  },
  getVentesbyProduct(){
    return prisma.productQuotation.groupBy({
      by: ['product_id'],
      _sum: {
        count: true
      }
    });
}
};