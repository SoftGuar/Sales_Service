import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/usersService';
import { CreateHelperInput, CreateUserInput } from '../models/userModel';
import exp from 'constants';

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
  request: FastifyRequest<{ Body: { userData: CreateUserInput, helperData: CreateHelperInput } }>,
  reply: FastifyReply
) => {
  try {
    const userData = request.body.userData;
    const helperData = request.body.helperData;
    const newUser = await UserService.createUserandHelper(userData,helperData);
    if(!newUser){
      return reply.code(500).send({
        success: false,
        message: 'Failed to create user'
      });
    }
    return reply.code(201).send({
      success: true,
      data: newUser
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const getUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await UserService.getAllUsers();
    if (!users) {
      return reply.code(500).send({
        success: false,
        message: 'No users found'
      });
    }
    return reply.code(200).send({
      success: true,
      data: users
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
}
export const getUserById = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const user = await UserService.getUserById(Number(id));
    if (!user) {
      return reply.code(404).send({
        success: false,
        message: 'User not found'
      });
    }
    return reply.code(200).send({
      success: true,
      data: user
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
}