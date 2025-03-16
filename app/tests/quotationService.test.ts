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
            const mockQuotation = { id: 1, user_id: 1, date: new Date() };
            (quotationModel.QuotationModel.create as jest.Mock).mockResolvedValue(mockQuotation);

            const result = await QuotationService.createQuotation({ user_id: 1, date: new Date() });

            expect(quotationModel.QuotationModel.create).toHaveBeenCalledWith({ user_id: 1, date: expect.any(Date) });
            expect(result).toEqual(mockQuotation);
        });

        it("should throw an error if creation fails", async () => {
            (quotationModel.QuotationModel.create as jest.Mock).mockRejectedValue(new Error("Creation error"));

            await expect(
                QuotationService.createQuotation({ user_id: 1, date: new Date() })
            ).rejects.toThrow("Failed to create quotation");
        });
    });

    describe("getQuotationById", () => {
        it("should return a quotation by ID", async () => {
            const mockQuotation = { id: 1, user_id: 1, date: new Date() };
            (quotationModel.QuotationModel.findById as jest.Mock).mockResolvedValue(mockQuotation);

            const result = await QuotationService.getQuotationById(1);

            expect(quotationModel.QuotationModel.findById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockQuotation);
        });

        it("should throw an error if fetching fails", async () => {
            (quotationModel.QuotationModel.findById as jest.Mock).mockRejectedValue(new Error("Fetch error"));

            await expect(QuotationService.getQuotationById(1)).rejects.toThrow("Failed to fetch quotation by ID");
        });
    });

    describe("getAllQuotations", () => {
        it("should return all quotations", async () => {
            const mockQuotations = [
                { id: 1, user_id: 1, date: new Date() },
                { id: 2, user_id: 2, date: new Date() },
            ];
            (quotationModel.QuotationModel.getAll as jest.Mock).mockResolvedValue(mockQuotations);

            const result = await QuotationService.getAllQuotations();

            expect(quotationModel.QuotationModel.getAll).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockQuotations);
        });

        it("should throw an error if fetching fails", async () => {
            (quotationModel.QuotationModel.getAll as jest.Mock).mockRejectedValue(new Error("Fetch error"));

            await expect(QuotationService.getAllQuotations()).rejects.toThrow("Failed to fetch all quotations");
        });
    });

    describe("updateQuotation", () => {
        it("should update a quotation successfully", async () => {
            const mockUpdatedQuotation = { id: 1, user_id: 1, date: new Date() };
            (quotationModel.QuotationModel.update as jest.Mock).mockResolvedValue(mockUpdatedQuotation);

            const result = await QuotationService.updateQuotation(1, { user_id: 2 });

            expect(quotationModel.QuotationModel.update).toHaveBeenCalledWith(1, { user_id: 2 });
            expect(result).toEqual(mockUpdatedQuotation);
        });

        it("should throw an error if update fails", async () => {
            (quotationModel.QuotationModel.update as jest.Mock).mockRejectedValue(new Error("Update error"));

            await expect(
                QuotationService.updateQuotation(1, { user_id: 2 })
            ).rejects.toThrow("Failed to update quotation");
        });
    });

    describe("deleteQuotation", () => {
        it("should delete a quotation successfully", async () => {
            const mockDeletedQuotation = { id: 1, user_id: 1, date: new Date() };
            (quotationModel.QuotationModel.delete as jest.Mock).mockResolvedValue(mockDeletedQuotation);

            const result = await QuotationService.deleteQuotation(1);

            expect(quotationModel.QuotationModel.delete).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockDeletedQuotation);
        });

        it("should throw an error if deletion fails", async () => {
            (quotationModel.QuotationModel.delete as jest.Mock).mockRejectedValue(new Error("Deletion error"));

            await expect(QuotationService.deleteQuotation(1)).rejects.toThrow("Failed to delete quotation");
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

        it("should throw an error if association fails", async () => {
            (quotationModel.QuotationModel.associateProduct as jest.Mock).mockRejectedValue(new Error("Association error"));

            await expect(
                QuotationService.associateProduct(1, 1, 2)
            ).rejects.toThrow("Failed to associate product with quotation");
        });
    });

    describe("findByUserId", () => {
        it("should return quotations for a specific user", async () => {
            const mockQuotations = [
                { id: 1, user_id: 1, date: new Date() },
                { id: 2, user_id: 1, date: new Date() },
            ];
            (quotationModel.QuotationModel.findByUserId as jest.Mock).mockResolvedValue(mockQuotations);

            const result = await QuotationService.findByUserId(1);

            expect(quotationModel.QuotationModel.findByUserId).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockQuotations);
        });

        it("should throw an error if fetching fails", async () => {
            (quotationModel.QuotationModel.findByUserId as jest.Mock).mockRejectedValue(new Error("Fetch error"));

            await expect(QuotationService.findByUserId(1)).rejects.toThrow("Failed to find quotations by user ID");
        });
    });

    describe("demandeQuotation", () => {
        it("should create a quotation and associate products successfully", async () => {
            const mockQuotation = { id: 1, user_id: 1, date: new Date() };
            const mockAssociation = { id: 1, product_id: 1, quotation_id: 1, count: 2 };

            (quotationModel.QuotationModel.create as jest.Mock).mockResolvedValue(mockQuotation);
            (quotationModel.QuotationModel.associateProduct as jest.Mock).mockResolvedValue(mockAssociation);

            await QuotationService.demandeQuotation(1, [{ product_id: 1, count: 2 }]);

            expect(quotationModel.QuotationModel.create).toHaveBeenCalledWith({ user_id: 1, date: expect.any(Date) });
            expect(quotationModel.QuotationModel.associateProduct).toHaveBeenCalledWith(1, 1, 2);
        });

        it("should throw an error if product association fails", async () => {
            const mockQuotation = { id: 1, user_id: 1, date: new Date() };

            (quotationModel.QuotationModel.create as jest.Mock).mockResolvedValue(mockQuotation);
            (quotationModel.QuotationModel.associateProduct as jest.Mock).mockRejectedValue(new Error("Association error"));

            await expect(
                QuotationService.demandeQuotation(1, [{ product_id: 1, count: 2 }])
            ).rejects.toThrow("Failed to create quotation request");
        });
    });
});
