import { QuotationModel } from "../models/quotationModel";
import prismaService from "../services/prismaService";

// Mock the entire prismaService module
jest.mock("../services/prismaService", () => ({
    __esModule: true,
    default: {
        quotation: {
            create: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        productQuotation: {
            create: jest.fn(),
        },
    },
}));

// Import the mocked module

describe("QuotationModel", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("create", () => {
        it("should create and return a quotation when prisma query succeeds", async () => {
            const newQuotation = { user_id: 1, date: new Date() };
            const createdQuotation = { id: 1, ...newQuotation };

            (prismaService.quotation.create as jest.Mock).mockResolvedValueOnce(createdQuotation);

            const result = await QuotationModel.create(newQuotation);

            expect(prismaService.quotation.create).toHaveBeenCalledWith({
                data: newQuotation,
            });
            expect(result).toEqual(createdQuotation);
        });

       
    });

    describe("findById", () => {
        it("should return a quotation when prisma query succeeds", async () => {
            const mockQuotation = { id: 1, user_id: 1, date: new Date() };

            (prismaService.quotation.findUnique as jest.Mock).mockResolvedValueOnce(mockQuotation);

            const result = await QuotationModel.findById(1);

            expect(prismaService.quotation.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockQuotation);
        });

        
    });

    describe("getAll", () => {
        it("should return an array of quotations when prisma query succeeds", async () => {
            const mockQuotations = [
                { id: 1, user_id: 1, date: new Date() },
                { id: 2, user_id: 2, date: new Date() },
            ];

            (prismaService.quotation.findMany as jest.Mock).mockResolvedValueOnce(mockQuotations);

            const result = await QuotationModel.getAll();

            expect(prismaService.quotation.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockQuotations);
        });

        
    });

    describe("update", () => {
        it("should update and return a quotation when prisma query succeeds", async () => {
            const updatedQuotation = { user_id: 2, date: new Date() };
            const mockUpdatedQuotation = { id: 1, ...updatedQuotation };

            (prismaService.quotation.update as jest.Mock).mockResolvedValue(mockUpdatedQuotation);

            const result = await QuotationModel.update(1, updatedQuotation);

            expect(prismaService.quotation.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: updatedQuotation,
            });
            expect(result).toEqual(mockUpdatedQuotation);
        });

        
    });

    describe("delete", () => {
        it("should delete and return a quotation when prisma query succeeds", async () => {
            const mockDeletedQuotation = { id: 1, user_id: 1, date: new Date() };

            (prismaService.quotation.delete as jest.Mock).mockResolvedValue(mockDeletedQuotation);

            const result = await QuotationModel.delete(1);

            expect(prismaService.quotation.delete).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockDeletedQuotation);
        });

        
    });

    describe("associateProduct", () => {
        it("should associate a product with a quotation when prisma query succeeds", async () => {
            const mockAssociation = { id: 1, product_id: 1, quotation_id: 1, count: 10 };

            (prismaService.productQuotation.create as jest.Mock).mockResolvedValue(mockAssociation);

            const result = await QuotationModel.associateProduct(1, 1, 10);

            expect(prismaService.productQuotation.create).toHaveBeenCalledWith({
                data: {
                    product_id: 1,
                    quotation_id: 1,
                    count: 10,
                },
            });
            expect(result).toEqual(mockAssociation);
        });

       
    });

    describe("findByUserId", () => {
        it("should return quotations for a specific user when prisma query succeeds", async () => {
            const mockQuotations = [
                { id: 1, user_id: 1, date: new Date() },
                { id: 2, user_id: 1, date: new Date() },
            ];

            (prismaService.quotation.findMany as jest.Mock).mockResolvedValueOnce(mockQuotations);

            const result = await QuotationModel.findByUserId(1);

            expect(prismaService.quotation.findMany).toHaveBeenCalledWith({
                where: { user_id: 1 },
            });
            expect(result).toEqual(mockQuotations);
        });

       
    });
});