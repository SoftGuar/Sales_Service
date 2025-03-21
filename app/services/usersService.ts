// app/services/userService.ts
import { Helper, User } from '@prisma/client';
import { UserModel, CreateUserInput,CreateHelperInput } from '../models/userModel';
import bcrypt from 'bcrypt';

export const UserService = {
  /**
   * Creates a user and a helper account.
   * @param {CreateUserInput} data - The data for creating the user and helper.
   * @returns {Promise<Object|null>} The created user and helper objects, or null if an error occurs.
   */
  createUserandHelper: async (dataUser: CreateUserInput,dataHelper:CreateHelperInput): Promise<object | null> => {
    try {
      const user: User = await fetch(
        !process.env.API_GATEWAY
          ? 'http://localhost:3000/admin/account/user'
          : `${process.env.API_GATEWAY}/admin/account/user`,
        {
          method: 'POST',
          headers: {  
        'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataUser),
        }
      ).then(async (res) => {
        if (res.status != 200) {
          throw new Error("Failed to create user");
        }
        return res.json(); 
      });
        const helper: Helper = await fetch( 
          !process.env.API_GATEWAY
            ? 'http://localhost:3000/admin/account/helper'
            : `${process.env.API_GATEWAY}/admin/account/helper`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataHelper),
          }
        ).then(async (res) => {
          if (res.status != 200) {
            throw new Error("Failed to create user");
          }
          return res.json(); 
        });
        const associate = await fetch(
          !process.env.API_GATEWAY
            ? `http://localhost:3000/accountManagment/user/${user.id}/helpers/${helper.id}`
            : `${process.env.API_GATEWAY}/accountManagment/user/${user.id}/helpers/${helper.id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.id, helperId: helper.id }),
          }
        ).then((res) =>
        {if (res.status != 200) {
          throw new Error("Failed to associate user and helper");}}
        );
        return { user, helper };
      
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