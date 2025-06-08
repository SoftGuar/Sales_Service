import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import requestLoggerMiddleware from './RequestLoggerMiddleware';
import errorHandler from './ErrorHandlerMiddleware';

const registerMiddlewares = (fastify: FastifyInstance) => {

  // Register request logger first to log all incoming requests
  requestLoggerMiddleware(fastify);

  // Register error handler
  errorHandler(fastify);

  // Register CORS middleware
  fastify.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });
};

export default registerMiddlewares;