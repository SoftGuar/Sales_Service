// app/services/userService.ts
import { User } from '@prisma/client';
import { UserModel, CreateUserInput } from '../models/userModel';
import bcrypt from 'bcrypt';

export const UserService = {
  /**
   * Creates a user and a helper account.
   * @param {CreateUserInput} data - The data for creating the user and helper.
   * @returns {Promise<Object|null>} The created user and helper objects, or null if an error occurs.
   */
  createUserandHelper: async (data: CreateUserInput): Promise<object | null> => {
    try {
      // TODO: Call the account management service to create accounts for both user and helper
      return null;
    } catch (e) {
      console.error('Error creating user:', e);
      return null;
    }
  },

  /**
   * Retrieves a user by their ID.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<User|null>} The user object, or null if not found and console error.
   * @throws {Error} If the user is not found.
   */
  getUserById: async (id: number): Promise<User | null> => {
    try {
      const result = await UserModel.findById(id);
      if (result) {
        return result;
      } else {
        return null;
      }
    } catch (e) {
      console.error('Error getting user by ID:', e);
      return null;
    }
  },

  /**
   * Retrieves all users from the database.
   * @returns {Promise<Array>} An array of user objects, or an empty array if no users are found or an error occurs.
   * @throws {Error} If no users are found.
   */
  getAllUsers: async (): Promise<Array<any>> => {
    try {
      const result = await UserModel.getAll();
      if (result) {
        return result;
      } else {
        throw new Error('No users found');
      }
    } catch (e) {
      console.error('Error getting all users:', e);
      return [];
    }
  },
};