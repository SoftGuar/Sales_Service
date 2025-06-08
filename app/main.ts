import dotenv from 'dotenv';
import Fastify from 'fastify';
import { checkDatabaseConnection, disconnectPrisma } from './services/prismaService';
import registerMiddlewares from './middlewares/index';
import registerRoutes from './routers/index';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { BaseError } from './errors/BaseError';
import appLogger from './utils/logger/logger';

// Load environment variables
dotenv.config();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Ensure DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const fastify = Fastify({ logger: true });

/**
 * Starts the Fastify server after performing necessary setup tasks.
 * 
 * This function performs the following steps:
 * 1. Checks the database connection to ensure the application can access the database.
 * 2. Registers middlewares required for the application.
 * 3. Configures Swagger for API documentation, including both the Swagger specification and the Swagger UI.
 * 4. Registers application routes.
 * 5. Starts the server and listens on the specified host and port.
 * 
 * If the server fails to start, the error is logged, and the process exits with a non-zero status code.
 * 
 * @async
 * @throws Will throw an error if the server fails to start.
 */
async function startServer() {
  // Check database connection first
  await checkDatabaseConnection();

  // 1. Register middlewares
  registerMiddlewares(fastify);

  // Global error handler
  fastify.setErrorHandler((error, request, reply) => {
    if (error instanceof BaseError) {
      appLogger.warn(error.toJSON(), 'Caught custom error');
      reply.status(error.statusCode).send(error.toJSON());
    } else {
      appLogger.error(error, 'Caught unhandled error');
      reply.status(500).send({
        success: false,
        error: {
          message: 'Internal Server Error',
          code: 'INTERNAL_SERVER_ERROR',
          timestamp: new Date().toISOString(),
          details: {},
        },
      });
    }
  });

  fastify.register(swagger, {
    swagger: {
      info: {
        title: 'My API',
        description: 'API Documentation generated with Fastify Swagger',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: `${host}:${port}`,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  });

  fastify.register(swaggerUi, {
    routePrefix: '/docs'
  });

  // 3. Register routes
  registerRoutes(fastify);

  // Start server
  try {
    await fastify.listen({ port, host });
    fastify.log.info(`Server started on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Add graceful shutdown
const gracefulShutdown = async () => {
  console.log('Shutting down gracefully');
  await disconnectPrisma();
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

startServer();