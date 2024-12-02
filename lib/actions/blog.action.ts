"use server";
import mongoose, { Types } from "mongoose";
import { revalidatePath } from "next/cache";

import Blog from "@/database/blog.model";

import { NotFoundError } from "../http-errors";
import logger from "../logger";
import dbConnect from "../mongoose";
import {
  CreateBlogParams,
  DeleteBlogParams,
  GetAllBlogsParams,
  GetBlogByIdParams,
} from "./shared.types";
import { slugify } from "../slugify";
import User from "@/database/user.model";
import Tag from "@/database/tag.model";
import TagBlog from "@/database/tag-blog.model";

export async function getAllBlogs(params: GetAllBlogsParams) {
  try {
    await dbConnect();

    const blogs = await Blog.find().populate({
      path: "author",
      model: User,
      select: "name",
    });
    if (!blogs) throw new NotFoundError("Không tìm thấy blog nào");
    return JSON.stringify(blogs);
  } catch (error) {
    logger.error(error);
  }
}

export async function deleteBlog(params: DeleteBlogParams) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await dbConnect();

    const deleteBlog = await Blog.findByIdAndDelete({
      _id: params.blogId,
    }).session(session);
    await TagBlog.deleteMany({ blog: params.blogId }).session(session);
    await Tag.updateMany(
      { _id: { $in: deleteBlog.tags } },
      { $inc: { blogs: -1 } },
      { session }
    );
    await session.commitTransaction();
    await session.endSession();
    revalidatePath(params.path);
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    logger.error(error);
  }
}
export async function getBlogById(params: GetBlogByIdParams) {
  try {
    await dbConnect();
    const blog = await Blog.findById(params.blogId);
    if (!blog) throw new NotFoundError("Không tìm thấy blog nào");
    return JSON.stringify(blog);
  } catch (error) {
    logger.error(error);
  }
}

export async function createBlog(params: CreateBlogParams) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await dbConnect();
    const { title, content, description, thumbnail, tags, path, authorId } =
      params;
    const slug = slugify(title);
    const author = await User.findOne({ clerkId: authorId });
    const [newBlog] = await Blog.create(
      [
        {
          title,
          slug,
          author: author._id,
          content,
          description,
          thumbnail,
        },
      ],
      { session }
    );
    const blogId = newBlog._id;
    const tagDocuments: Types.ObjectId[] = [];
    const tagPromises = tags.map(async (tag) => {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $inc: { blogs: 1 } },
        { upsert: true, new: true, session }
      );
      tagDocuments.push(existingTag._id);
      return TagBlog.create([{ tag: existingTag._id, blog: blogId }], {
        session,
      });
    });
    await Promise.all(tagPromises);
    newBlog.tags = tagDocuments;
    await newBlog.save({ session });
    await session.commitTransaction();
    await session.endSession();
    revalidatePath(path);
    return JSON.stringify(newBlog);
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    logger.error(error);
  }
}
