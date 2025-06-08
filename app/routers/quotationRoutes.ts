import { FastifyInstance } from "fastify";
import * as qh from "../handlers/quotationHandler";
import { CommonErrorResponses } from './baseSchema';

/**
 * Registers the routes for managing quotations in the Fastify application.
 *
 * @param fastify - The Fastify instance to which the routes will be added.
 */
async function quotationRoutes(fastify: FastifyInstance) {
  fastify.post("/", createQuotationSchema, qh.createQuotation);

  fastify.get("/", getAllQuotationsSchema, qh.getAllQuotations);

  fastify.put("/:id", updateQuotationSchema, qh.updateQuotation);

  fastify.get("/:id", getQuotationByIdSchema, qh.getQuotationById);

  fastify.delete("/:id", deleteQuotationSchema, qh.deleteQuotation);

  fastify.post("/associate/:id", associateProductSchema, qh.associateProduct);

  fastify.get(
    "/user/:user_id",
    getQuotationByUserIdSchema,
    qh.getQuotationByUserId
  );

  fastify.post("/demande", demandeQuotationSchema, qh.demandeQuotation);
}

export default quotationRoutes;

const createQuotationSchema = {
  schema: {
    description: "Creates a new quotation",
    tags: ["Quotations"],
    body: {
      type: "object",
      properties: {
        user_id: { type: "number" },
        date: { type: "string", format: "date-time" },
      },
      required: ["user_id", "date"],
    },
    response: {
      201: {
        description: "Quotation created successfully",
        type: "object",
        properties: {
          message: { type: "string" },
          quotation: {
            type: "object",
            properties: {
              id: { type: "number" },
              user_id: { type: "number" },
              date: { type: "string", format: "date-time" },
            },
          },
        },
      },
      ...CommonErrorResponses,
    },
  },
};

const getAllQuotationsSchema = {
  schema: {
    description: "Retrieves all quotations",
    tags: ["Quotations"],
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "number" },
            user_id: { type: "number" },
            date: { type: "string", format: "date-time" },
          },
        },
      },
      ...CommonErrorResponses,
    },
  },
};

const updateQuotationSchema = {
  schema: {
    description: "Updates an existing quotation by its ID",
    tags: ["Quotations"],
    params: {
      type: "object",
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
    body: {
      type: "object",
      properties: {
        user_id: { type: "number" },
        date: { type: "string", format: "date-time" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          id: { type: "number" },
          user_id: { type: "number" },
          date: { type: "string", format: "date-time" },
        },
      },
      ...CommonErrorResponses,
    },
  },
};

const getQuotationByIdSchema = {
  schema: {
    description: "Retrieves a specific quotation by its ID",
    tags: ["Quotations"],
    params: {
      type: "object",
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          id: { type: "number" },
          user_id: { type: "number" },
          date: { type: "string", format: "date-time" },
        },
      },
      ...CommonErrorResponses,
    },
  },
};

const deleteQuotationSchema = {
  schema: {
    description: "Deletes a specific quotation by its ID",
    tags: ["Quotations"],
    params: {
      type: "object",
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      ...CommonErrorResponses,
    },
  },
};

const associateProductSchema = {
  schema: {
    description: "Associates a product with a quotation by its ID",
    tags: ["Quotations"],
    params: {
      type: "object",
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
    body: {
      type: "object",
      properties: {
        product_id: { type: "number" },
        count: { type: "number" },
      },
      required: ["product_id", "count"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          product_id: { type: "number" },
          count: { type: "number" },
          quotation_id: { type: "number" },
        },
      },
      ...CommonErrorResponses,
    },
  },
};

const getQuotationByUserIdSchema = {
  schema: {
    description: "Retrieves all quotations associated with a specific user ID",
    tags: ["Quotations"],
    params: {
      type: "object",
      properties: {
        user_id: { type: "number" },
      },
      required: ["user_id"],
    },
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "number" },
            user_id: { type: "number" },
            date: { type: "string", format: "date-time" },
            ProductQuotation: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  product_id: { type: "number" },
                  count: { type: "number" },
                },
              },
            },
          },
        },
      },
      ...CommonErrorResponses,
    },
  },
};

const demandeQuotationSchema = {
  schema: {
    description:
      "Handles the creation of a quotation request with associated products",
    tags: ["Quotations"],
    body: {
      type: "object",
      properties: {
        user_id: { type: "number" },
        products: {
          type: "array",
          items: {
            type: "object",
            properties: {
              product_id: { type: "number" },
              count: { type: "number" },
            },
          },
        },
      },
      required: ["user_id", "products"],
    },
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          quotation: {
            type: "object",
            properties: {
              id: { type: "number" },
              user_id: { type: "number" },
              products: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    product_id: { type: "number" },
                    count: { type: "number" },
                  },
                },
              },
            },
          },
        },
      },
      ...CommonErrorResponses,
    },
  },
};
