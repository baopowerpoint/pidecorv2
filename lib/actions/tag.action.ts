"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import Blog from "@/database/blog.model";
import Product from "@/database/product.model";
import TagBlog from "@/database/tag-blog.model";
import TagProduct from "@/database/tag-product.model";
import Tag from "@/database/tag.model";

import { NotFoundError } from "../http-errors";
import logger from "../logger";
import dbConnect from "../mongoose";
import { DeleteTagParams } from "./shared.types";

export async function getAllTags() {
  try {
    await dbConnect();

    const tags = await Tag.find();
    if (!tags) throw new NotFoundError("Không tìm thấy thẻ nào");
    return JSON.stringify(tags);
  } catch (error) {
    logger.error(error);
  }
}

export async function deleteTag(params: DeleteTagParams) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await dbConnect();
    const { tagId, path } = params;
    // Xoá tất cả bản ghi của tag product có tagId
    await TagProduct.deleteMany({ tagId }).session(session);
    // Xoá tất cả bản ghi của tag blog có tagId;
    await TagBlog.deleteMany({ tagId }).session(session);

    // kéo tagId ra khỏi tags field của các bản ghi product có chứa tagId
    await Product.updateMany(
      { tags: tagId },
      { $pull: { tags: tagId } }
    ).session(session);
    // kéo tagId ra khỏi tags field của các bản ghi blog có chứa tagId
    await Blog.updateMany({ tags: tagId }, { $pull: { tags: tagId } }).session(
      session
    );

    // xoá tag
    await Tag.findByIdAndDelete(tagId).session(session);

    await session.commitTransaction();
    session.endSession();
    revalidatePath(path);
  } catch (error) {
    logger.error(error);
    await session.abortTransaction();
    session.endSession();
  }
}
