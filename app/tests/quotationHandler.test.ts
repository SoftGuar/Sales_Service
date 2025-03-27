import {createQuotation,
    getAllQuotations,
    getQuotationById,
    updateQuotation,
    deleteQuotation,
    associateProduct,
    getQuotationByUserId,
    CreateQuotationRequest,
    UpdateQuotationRequest,
    AssociateProductRequest
    } from "../handlers/quotationHandler";
import { FastifyRequest, FastifyReply } from "fastify";
import { QuotationService } from "../services/quotationService";

// Mock the QuotationService module
jest.mock("../services/quotationService");

describe("quotationHandler", () => {
let mockReply: Partial<FastifyReply>;

beforeEach(() => {
    jest.clearAllMocks();
    mockReply = {
        send: jest.fn(),
        code: jest.fn().mockReturnThis(),
        log: {
            info: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
            fatal: jest.fn(),
            trace: jest.fn(),
            child: jest.fn(),
            level: "info",
            silent: jest.fn(),
        },
    };
});

describe("createQuotation", () => {
    it("should create a quotation and return it", async () => {
        const mockQuotation = { userId: 1, total: 1000 };
        const mockCreatedQuotation = { id: 1, ...mockQuotation };
        (QuotationService.createQuotation as jest.Mock).mockResolvedValue(mockCreatedQuotation);

        const mockRequest = {
            body: mockQuotation,
        } as unknown as FastifyRequest<CreateQuotationRequest>;

        await createQuotation(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.createQuotation).toHaveBeenCalledWith(mockQuotation);
        expect(mockReply.code).toHaveBeenCalledWith(201);
        expect(mockReply.send).toHaveBeenCalledWith({
            message: "Quotation created successfully",
            quotation: mockCreatedQuotation,
        });
    });

    it("should return a 500 error if quotation creation fails", async () => {
        const mockQuotation = { userId: 1, total: 1000 };
        (QuotationService.createQuotation as jest.Mock).mockResolvedValue(null);

        const mockRequest = {
            body: mockQuotation,
        } as unknown as FastifyRequest<CreateQuotationRequest>;

        await createQuotation(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.createQuotation).toHaveBeenCalledWith(mockQuotation);
        expect(mockReply.code).toHaveBeenCalledWith(500);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Failed to create quotation" });
    });
});

describe("getAllQuotations", () => {
    it("should return all quotations", async () => {
        const mockQuotations = [{ id: 1, total: 1000 }, { id: 2, total: 2000 }];
        (QuotationService.getAllQuotations as jest.Mock).mockResolvedValue(mockQuotations);

        const mockRequest = {} as FastifyRequest;

        await getAllQuotations(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.getAllQuotations).toHaveBeenCalledTimes(1);
        expect(mockReply.send).toHaveBeenCalledWith(mockQuotations);
    });

    it("should return a 500 error if fetching quotations fails", async () => {
        (QuotationService.getAllQuotations as jest.Mock).mockResolvedValue(null);

        const mockRequest = {} as FastifyRequest;

        await getAllQuotations(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.getAllQuotations).toHaveBeenCalledTimes(1);
        expect(mockReply.code).toHaveBeenCalledWith(500);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Failed to get quotations" });
    });
});

describe("getQuotationById", () => {
    it("should return the quotation if found", async () => {
        const mockQuotation = { id: 1, total: 1000 };
        (QuotationService.getQuotationById as jest.Mock).mockResolvedValue(mockQuotation);

        const mockRequest = { params: { id: 1 } } as FastifyRequest<{ Params: { id: number } }>;

        await getQuotationById(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.getQuotationById).toHaveBeenCalledWith(1);
        expect(mockReply.send).toHaveBeenCalledWith(mockQuotation);
    });

    it("should return a 404 error if quotation is not found", async () => {
        (QuotationService.getQuotationById as jest.Mock).mockResolvedValue(null);

        const mockRequest = { params: { id: 1 } } as FastifyRequest<{ Params: { id: number } }>;

        await getQuotationById(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.getQuotationById).toHaveBeenCalledWith(1);
        expect(mockReply.code).toHaveBeenCalledWith(404);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Quotation not found" });
    });
});

describe("updateQuotation", () => {
    it("should update the quotation and return it", async () => {
        const mockQuotation = { total: 1500 };
        const mockUpdatedQuotation = { id: 1, ...mockQuotation };
        (QuotationService.updateQuotation as jest.Mock).mockResolvedValue(mockUpdatedQuotation);

        const mockRequest = {
            params: { id: 1 },
            body: mockQuotation,
        } as unknown as FastifyRequest<UpdateQuotationRequest>;

        await updateQuotation(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.updateQuotation).toHaveBeenCalledWith(1, mockQuotation);
        expect(mockReply.send).toHaveBeenCalledWith(mockUpdatedQuotation);
    });

    it("should return a 404 error if quotation is not found", async () => {
        const mockQuotation = { total: 1500 };
        (QuotationService.updateQuotation as jest.Mock).mockResolvedValue(null);

        const mockRequest = {
            params: { id: 1 },
            body: mockQuotation,
        } as unknown as FastifyRequest<UpdateQuotationRequest>;

        await updateQuotation(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.updateQuotation).toHaveBeenCalledWith(1, mockQuotation);
        expect(mockReply.code).toHaveBeenCalledWith(404);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Quotation not found" });
    });
});

describe("deleteQuotation", () => {
    it("should delete the quotation and return it", async () => {
        const mockDeletedQuotation = { id: 1, total: 1000 };
        (QuotationService.deleteQuotation as jest.Mock).mockResolvedValue(mockDeletedQuotation);

        const mockRequest = { params: { id: 1 } } as FastifyRequest<{ Params: { id: number } }>;

        await deleteQuotation(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.deleteQuotation).toHaveBeenCalledWith(1);
        expect(mockReply.send).toHaveBeenCalledWith(mockDeletedQuotation);
    });

    it("should return a 404 error if quotation is not found", async () => {
        (QuotationService.deleteQuotation as jest.Mock).mockResolvedValue(null);

        const mockRequest = { params: { id: 1 } } as FastifyRequest<{ Params: { id: number } }>;

        await deleteQuotation(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.deleteQuotation).toHaveBeenCalledWith(1);
        expect(mockReply.code).toHaveBeenCalledWith(404);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Quotation not found" });
    });
});

describe("associateProduct", () => {
    it("should associate a product with a quotation and return it", async () => {
        const mockAssociation = { id: 1, productId: 2, count: 3 };
        (QuotationService.associateProduct as jest.Mock).mockResolvedValue(mockAssociation);

        const mockRequest = {
            params: { id: 1 },
            body: { product_id: 2, count: 3 },
        } as FastifyRequest<AssociateProductRequest>;

        await associateProduct(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.associateProduct).toHaveBeenCalledWith(1, 2, 3);
        expect(mockReply.send).toHaveBeenCalledWith(mockAssociation);
    });

    it("should return a 404 error if product is not found", async () => {
        (QuotationService.associateProduct as jest.Mock).mockResolvedValue(null);

        const mockRequest = {
            params: { id: 1 },
            body: { product_id: 2, count: 3 },
        } as FastifyRequest<AssociateProductRequest>;

        await associateProduct(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.associateProduct).toHaveBeenCalledWith(1, 2, 3);
        expect(mockReply.code).toHaveBeenCalledWith(404);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Product not found" });
    });
});

describe("getQuotationByUserId", () => {
    it("should return quotations for a user", async () => {
        const mockQuotations = [{ id: 1, total: 1000 }, { id: 2, total: 2000 }];
        (QuotationService.findByUserId as jest.Mock).mockResolvedValue(mockQuotations);

        const mockRequest = { params: { user_id: 1 } } as FastifyRequest<{ Params: { user_id: number } }>;

        await getQuotationByUserId(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.findByUserId).toHaveBeenCalledWith(1);
        expect(mockReply.send).toHaveBeenCalledWith(mockQuotations);
    });

    it("should return a 404 error if no quotations are found for the user", async () => {
        (QuotationService.findByUserId as jest.Mock).mockResolvedValue(null);

        const mockRequest = { params: { user_id: 1 } } as FastifyRequest<{ Params: { user_id: number } }>;

        await getQuotationByUserId(mockRequest, mockReply as FastifyReply);

        expect(QuotationService.findByUserId).toHaveBeenCalledWith(1);
        expect(mockReply.code).toHaveBeenCalledWith(404);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Quotation not found" });
    });
});
});