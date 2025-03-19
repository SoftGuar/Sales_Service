import { User } from "@prisma/client";
import prisma from "../services/prismaService";

export interface CreateUserInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
}
export interface CreateHelperInput
{
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}
export const UserModel = {
  /**
   * Finds a user by their ID.
   * @param {number} id - The ID of the user to find.
   * @returns {Promise<Object|null>} The user object, or null if not found or an error occurs.
   * @throws {Error} If the user is not found.
   */
  findById: async (id: number): Promise<User | null> => {
    try {
      const result = await prisma.user.findUnique({
        where: { id },
      });
      if (result) {
        return result;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error finding user by ID:", error);
      return null;
    }
  },

  /**
   * Retrieves all users from the database.
   * @returns {Promise<Array>} An array of user objects, or an empty array if no users are found or an error occurs.
   * @throws {Error} If no users are found.
   */
  getAll: async (): Promise<Array<any>> => {
    try {
      const result = await prisma.user.findMany();
      return result;
    } catch (error) {
      console.error("Error getting all users:", error);
      return [];
    }
  },
};