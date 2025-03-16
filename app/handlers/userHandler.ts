import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/usersService';
import { CreateUserInput } from '../models/userModel';

/**
 * Handles the creation of a new user.
 *
 * @param request - The Fastify request object containing the user data in the body.
 * @param reply - The Fastify reply object used to send the response.
 * @returns A response with a status code of 201 and the created user data if successful,
 *          or a status code of 400 with an error message if an error occurs.
 *
 * @throws Will return an error message if the user creation fails.
 */
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