"use server";
import { revalidatePath } from "next/cache";

import User from "@/database/user.model";
import { APIErrorResponse } from "@/types/global";

import {
  DeleteUserParams,
  CreateUserParams,
  UpdateUserParams,
} from "./shared.types.d";
import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import dbConnect from "../mongoose";

export async function createUser(userData: CreateUserParams) {
  try {
    await dbConnect();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    return handleError(error) as APIErrorResponse;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await dbConnect();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    return handleError(error) as APIErrorResponse;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await dbConnect();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new NotFoundError("User");
    }
    return user;
  } catch (error) {
    return handleError(error) as APIErrorResponse;
  }
}
