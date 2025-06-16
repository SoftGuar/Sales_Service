import { QuotationService } from "../services/quotationService";

// Mock the quotationModel module
jest.mock("../models/quotationModel");
import * as quotationModel from "../models/quotationModel";

describe("QuotationService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createQuotation", () => {
        it("should create a quotation successfully", async () => {
            const mockQuotation = { id: 1, user_id: 1 };
            (quotationModel.QuotationModel.create as jest.Mock).mockResolvedValue(mockQuotation);

            const result = await QuotationService.createQuotation({ user_id: 1});

            expect(quotationModel.QuotationModel.create).toHaveBeenCalledWith(expect.objectContaining({ user_id: 1 }));
            expect(result).toEqual(mockQuotation);
        });

        
    });

    describe("getQuotationById", () => {
        it("should return a quotation by ID", async () => {
            const mockQuotation = { id: 1, user_id: 1 };
            (quotationModel.QuotationModel.findById as jest.Mock).mockResolvedValue(mockQuotation);

            const result = await QuotationService.getQuotationById(1);

            expect(quotationModel.QuotationModel.findById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockQuotation);
        });

        
    });

    describe("getAllQuotations", () => {
        it("should return all quotations", async () => {
            const mockQuotations = [
                { id: 1, user_id: 1},
                { id: 2, user_id: 2},
            ];
            (quotationModel.QuotationModel.getAll as jest.Mock).mockResolvedValue(mockQuotations);

            const result = await QuotationService.getAllQuotations();

            expect(quotationModel.QuotationModel.getAll).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockQuotations);
        });

        
    });

    describe("updateQuotation", () => {
        it("should update a quotation successfully", async () => {
            const mockUpdatedQuotation = { id: 1, user_id: 1};
            (quotationModel.QuotationModel.update as jest.Mock).mockResolvedValue(mockUpdatedQuotation);

            const result = await QuotationService.updateQuotation(1, { user_id: 2 });

            expect(quotationModel.QuotationModel.update).toHaveBeenCalledWith(1, { user_id: 2 });
            expect(result).toEqual(mockUpdatedQuotation);
        });

        
    });

    describe("deleteQuotation", () => {
        it("should delete a quotation successfully", async () => {
            const mockDeletedQuotation = { id: 1, user_id: 1 };
            (quotationModel.QuotationModel.delete as jest.Mock).mockResolvedValue(mockDeletedQuotation);

            const result = await QuotationService.deleteQuotation(1);

            expect(quotationModel.QuotationModel.delete).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockDeletedQuotation);
        });

       
    });

    describe("associateProduct", () => {
        it("should associate a product with a quotation successfully", async () => {
            const mockAssociation = { id: 1, product_id: 1, quotation_id: 1, count: 2 };
            (quotationModel.QuotationModel.associateProduct as jest.Mock).mockResolvedValue(mockAssociation);

            const result = await QuotationService.associateProduct(1, 1, 2);

            expect(quotationModel.QuotationModel.associateProduct).toHaveBeenCalledWith(1, 1, 2);
            expect(result).toEqual(mockAssociation);
        });

        
    });

    describe("findByUserId", () => {
        it("should return quotations for a specific user", async () => {
            const mockQuotations = [
                { id: 1, user_id: 1 },
                { id: 2, user_id: 1},
            ];
            (quotationModel.QuotationModel.findByUserId as jest.Mock).mockResolvedValue(mockQuotations);

            const result = await QuotationService.findByUserId(1);

            expect(quotationModel.QuotationModel.findByUserId).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockQuotations);
        });

        
    });

    describe("demandeQuotation", () => {
        it("should create a quotation and associate products successfully", async () => {
            const mockQuotation = { id: 1, user_id: 1 };
            const mockAssociation = { id: 1, product_id: 1, quotation_id: 1, count: 2 };

            (quotationModel.QuotationModel.create as jest.Mock).mockResolvedValue(mockQuotation);
            (quotationModel.QuotationModel.associateProduct as jest.Mock).mockResolvedValue(mockAssociation);

            await QuotationService.demandeQuotation(1, [{ product_id: 1, count: 2 }]);

            expect(quotationModel.QuotationModel.create).toHaveBeenCalledWith({ user_id: 1});
            expect(quotationModel.QuotationModel.associateProduct).toHaveBeenCalledWith(1, 1, 2);
        });

       
    });
});
