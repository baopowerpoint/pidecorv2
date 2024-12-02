"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import Category from "@/database/category.model";
import Collection from "@/database/collection.model";

import { NotFoundError } from "../http-errors";
import logger from "../logger";
import dbConnect from "../mongoose";
import { slugify } from "../slugify";
import {
  CreateCollectionParams,
  DeleteCollectionParams,
  EditCollectionParams,
  GetAllCollectionsParams,
  GetCollectionByIdParams,
} from "./shared.types";

export async function createCollection(params: CreateCollectionParams) {
  try {
    dbConnect();
    const { name, image, path, description, category } = params;
    const slug = slugify(name);
    const newCollection = await Collection.create({
      name,
      image,
      description,
      category,
      slug,
    });
    await Category.findByIdAndUpdate(category, {
      $push: { collections: newCollection._id },
    });
    revalidatePath(path);
    return JSON.stringify(newCollection);
  } catch (error) {
    logger.error(error);
  }
}
export async function getAllCollections(params: GetAllCollectionsParams) {
  try {
    await dbConnect();
    const collections = await Collection.find()
      .populate({
        path: "category",
        select: "name",
        model: Category,
      })
      .select(params?.select || "");
    if (!collections) throw new NotFoundError("Không tìm thấy bộ sưu tập nào");
    return JSON.stringify(collections);
  } catch (error) {
    logger.error(error);
  }
}

export async function deleteCollection(params: DeleteCollectionParams) {
  try {
    await dbConnect();

    await Collection.findByIdAndDelete({ _id: params.collectionId });
    revalidatePath(params.path);
  } catch (error) {
    logger.error(error);
  }
}

export async function getCollectionById(params: GetCollectionByIdParams) {
  try {
    await dbConnect();
    const collection = await Collection.findById(params.collectionId);
    if (!collection) throw new NotFoundError("Không tìm thấy bộ sưu tập");
    return JSON.stringify(collection);
  } catch (error) {
    logger.error(error);
  }
}

export async function editCollection(params: EditCollectionParams) {
  try {
    await dbConnect();
    const collection = await Collection.findById(params.collectionId);
    if (!collection) throw new NotFoundError("Không tìm thấy bộ sưu tập");
    const oldCategory = collection.category.toString();
    const newCategory = params.updateData.category;

    if (oldCategory !== newCategory) {
      // 1. Remove collection ID from old category
      await Category.findByIdAndUpdate(oldCategory, {
        $pull: { collections: collection._id },
      });
      // 2. Add collection ID to new category
      await Category.findByIdAndUpdate(newCategory, {
        $push: { collections: collection._id },
      });
    }
    collection.category = newCategory;
    collection.name = params.updateData.name;
    collection.image = params.updateData.image;
    collection.description = params.updateData.description;
    await collection.save();
    revalidatePath(params.path);
  } catch (error) {
    logger.error(error);
  }
}
