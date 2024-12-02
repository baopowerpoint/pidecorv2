"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import ColorProduct from "@/database/color-product.model";
import Color from "@/database/color.model";
import Product from "@/database/product.model";

import { NotFoundError } from "../http-errors";
import logger from "../logger";
import dbConnect from "../mongoose";
import { DeleteColorParams } from "./shared.types";

export async function deleteColor(params: DeleteColorParams) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await dbConnect();
    // xoá các bản ghi product color có colorId là màu cần xoá
    await ColorProduct.deleteMany({ colorId: params.colorId }).session(session);
    // kéo id màu cần xoá ra khỏi các bản ghi product
    await Product.updateMany(
      {
        colors: params.colorId,
      },
      {
        $pull: {
          colors: params.colorId,
        },
      }
    ).session(session);
    await Color.findByIdAndDelete(params.colorId).session(session);
    revalidatePath(params.path);
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    logger.error(error);
    await session.abortTransaction();
    session.endSession();
  }
}
export async function getAllColors() {
  try {
    await dbConnect();
    const colors = await Color.find();
    if (!colors) throw new NotFoundError("Không tìm thấy màu nào");
    return JSON.stringify(colors);
  } catch (error) {
    logger.error(error);
  }
}
