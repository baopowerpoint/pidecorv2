"use server";

import { revalidatePath } from "next/cache";

import Category from "@/database/category.model";
import Collection from "@/database/collection.model";

import logger from "../logger";
import dbConnect from "../mongoose";
import { slugify } from "../slugify";
import {
  CreateCategoryParams,
  DeleteCategoryParams,
  EditCategoryParams,
  GetAllCategoriesParams,
  GetCategoryByIdParams,
} from "./shared.types";
import { NotFoundError } from "../http-errors";

export async function createCategory(params: CreateCategoryParams) {
  try {
    dbConnect();
    const { name, image, path, description } = params;
    const slug = slugify(name);
    const newCategory = await Category.create({
      name,
      image,
      description,
      slug,
    });
    revalidatePath(path);
    return JSON.stringify(newCategory);
  } catch (error) {
    logger.error(error);
  }
}
export async function getAllCategories(params: GetAllCategoriesParams) {
  try {
    await dbConnect();
    const categories = await Category.find()
      .populate({
        path: "collections",
        select: "name",
        model: Collection,
      })
      .select(params?.select || "");
    if (!categories) throw new NotFoundError("Không tìm thấy danh mục nào");

    return JSON.stringify(categories);
  } catch (error) {
    logger.error(error);
  }
}

export async function deleteCategory(params: DeleteCategoryParams) {
  try {
    await dbConnect();

    await Category.findByIdAndDelete({ _id: params.categoryId });
    revalidatePath(params.path);
  } catch (error) {
    logger.error(error);
  }
}

export async function getCategoryById(params: GetCategoryByIdParams) {
  try {
    await dbConnect();
    const category = await Category.findById(params.categoryId);
    if (!category) throw new NotFoundError("Không tìm thấy danh mục");
    return JSON.stringify(category);
  } catch (error) {
    logger.error(error);
  }
}

export async function editCategory(params: EditCategoryParams) {
  try {
    await dbConnect();
    const category = await Category.findById(params.categoryId);
    if (!category) throw new NotFoundError("Không tìm thấy danh mục");
    category.name = params.updateData.name;
    category.image = params.updateData.image;
    category.description = params.updateData.description;
    await category.save();
    revalidatePath(params.path);
  } catch (error) {
    logger.error(error);
  }
}
