import dotenv from 'dotenv';
import Fastify from 'fastify';
import { checkDatabaseConnection, disconnectPrisma } from './services/prismaService';
import registerMiddlewares from './middlewares/index';
import registerRoutes  from './routers/index';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
var amqp = require('amqplib/callback_api');

// Load environment variables
dotenv.config();
// Ensure DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const fastify = Fastify({ logger: true });

async function startServer() {
  
  // Check database connection first
  await checkDatabaseConnection();
  
   // 1. Register middlewares
   registerMiddlewares(fastify);
   // 2. Register routes
   registerRoutes(fastify);
   fastify.register(swagger, {
    swagger: {
      info: {
        title: 'API Docs',
        description: 'API Documentation for the Fastify project',
        version: '1.0.0',
      },
    },
  });
  
  fastify.register(swaggerUi);
  
  // Start server
  try {
    const port = Number(process.env.PORT) || 3001;
    const host = process.env.HOST || '0.0.0.0';
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
