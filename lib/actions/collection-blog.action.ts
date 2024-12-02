"use server";

import { revalidatePath } from "next/cache";

import Blog from "@/database/blog.model";
import CollectionBlog from "@/database/collection-blog.model";
import Collection from "@/database/collection.model";

import logger from "../logger";
import dbConnect from "../mongoose";
import {
  CreateCollectionBlogParams,
  DeleteCollectionBlogParams,
} from "./shared.types";

export async function getAllCollectionBlogs(params: any) {
  try {
    await dbConnect();

    const collectionBlogs = await CollectionBlog.find()
      .populate({
        path: "collectionId",
        select: "name",
        model: Collection,
      })
      .populate({
        path: "blogId",
        select: "title",
        model: Blog,
      });
    return JSON.stringify(collectionBlogs);
  } catch (error) {
    logger.error(error);
  }
}

export async function createCollectionBlog(params: CreateCollectionBlogParams) {
  try {
    await dbConnect();

    const { collectionId, blogId, path } = params;
    const collectionBlogs = await CollectionBlog.findOne({
      collectionId,
      blogId,
    });

    if (collectionBlogs) {
      return;
    }
    await CollectionBlog.create({ collectionId, blogId });
    revalidatePath(path);
  } catch (error) {
    logger.error(error);
  }
}

export async function deleteCollectionBlog(params: DeleteCollectionBlogParams) {
  try {
    await dbConnect();
    await CollectionBlog.findByIdAndDelete(params.collectionBlogId);
    revalidatePath(params.path);
  } catch (error) {
    logger.error(error);
  }
}
