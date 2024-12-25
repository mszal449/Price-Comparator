import { IUser } from "types";
import { connectToMongoDB } from "../lib/mongodb";
import User from "../models/User";

export const getUsers = async (): Promise<IUser[]> => {
  try {
    await connectToMongoDB();
    console.log("Getting users");
    const users = await User.find().exec();
    const userResponse: IUser[] = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));

    return userResponse;
  } catch {
    throw new Error("Error fetching users");
  }
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    await connectToMongoDB();

    const user = await User.findById(id).exec();
    return user;
  } catch {
    throw new Error("Error fetching user");
  }
};

export const updateUserRole = async (
  id: string,
  role: string,
): Promise<void> => {
  try {
    await connectToMongoDB();

    await User.findByIdAndUpdate(id, { role }).exec();
  } catch {
    throw new Error("Error updating user role");
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await connectToMongoDB();

    await User.findByIdAndDelete(id).exec();
  } catch {
    throw new Error("Error deleting user");
  }
};
