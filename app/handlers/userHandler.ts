// app/handlers/userHandler.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/usersService';
import { CreateUserInput, UpdateUserInput } from '../models/userModel';

export const createUser = async (
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {
  try {
    const userData = request.body;
    const newUser = await UserService.createUserandHelper(userData);
    
    return reply.code(201).send({
      success: true,
      data: newUser
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};