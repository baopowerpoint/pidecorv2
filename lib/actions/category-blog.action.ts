"use server";

import { revalidatePath } from "next/cache";

import Blog from "@/database/blog.model";
import CategoryBlog from "@/database/category-blog.model";
import Category from "@/database/category.model";

import logger from "../logger";
import dbConnect from "../mongoose";
import {
  CreateCategoryBlogParams,
  DeleteCategoryBlogParams,
} from "./shared.types";

export async function getAllCategoryBlogs(params: any) {
  try {
    await dbConnect();
    const categoryBlogs = await CategoryBlog.find()
      .populate({
        path: "categoryId",
        select: "name",
        model: Category,
      })
      .populate({
        path: "blogId",
        select: "title",
        model: Blog,
      });
    return JSON.stringify(categoryBlogs);
  } catch (error) {
    logger.error(error);
  }
}
export async function createCategoryBlog(params: CreateCategoryBlogParams) {
  try {
    await dbConnect();
    const { categoryId, blogId, path } = params;
    // Check if categoryBlog already exists
    const categoryBlog = await CategoryBlog.findOne({ categoryId, blogId });

    if (categoryBlog) {
      return;
    }
    await CategoryBlog.create({ categoryId, blogId });
    revalidatePath(path);
  } catch (error) {
    logger.error(error);
  }
}

export async function deleteCategoryBlog(params: DeleteCategoryBlogParams) {
  try {
    await dbConnect();
    await CategoryBlog.findByIdAndDelete(params.categoryBlogId);
    revalidatePath(params.path);
  } catch (error) {
    logger.error(error);
  }
}
