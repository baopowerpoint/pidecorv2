"use server";

import { revalidatePath } from "next/cache";

import Brand from "@/database/brand.model";

import handleError from "../handlers/error";
import dbConnect from "../mongoose";
import {
  CreateBrandParams,
  DeleteBrandParams,
  EditBrandParams,
  GetBrandByIdParams,
} from "./shared.types";
import { NotFoundError } from "../http-errors";
import logger from "../logger";
import { slugify } from "../slugify";

export async function createBrand(params: CreateBrandParams) {
  try {
    await dbConnect();
    const { name, image, description } = params;
    const slug = slugify(name);
    const newBrand = await Brand.create({
      name,
      image,
      description,
      slug,
    });
    revalidatePath(params.path);
    return JSON.stringify(newBrand);
  } catch (error) {
    logger.error(error);
  }
}

export async function getAllBrands() {
  try {
    await dbConnect();
    const brands = await Brand.find();
    if (!brands) throw new NotFoundError("Không tìm thấy thương hiệu nào");
    return JSON.stringify(brands);
  } catch (error) {
    logger.error(error);
  }
}

export async function deleteBrand(params: DeleteBrandParams) {
  try {
    await dbConnect();

    await Brand.findByIdAndDelete({ _id: params.brandId });
    revalidatePath(params.path);
  } catch (error) {
    logger.error(error);
  }
}

export async function getBrandById(params: GetBrandByIdParams) {
  try {
    await dbConnect();
    const brand = await Brand.findById(params.brandId);
    if (!brand) throw new NotFoundError("Không tìm thấy thương hiệu");
    return JSON.stringify(brand);
  } catch (error) {
    logger.error(error);
  }
}

export async function editBrand(params: EditBrandParams) {
  try {
    await dbConnect();
    const brand = await Brand.findById(params.brandId);
    if (!brand) throw new NotFoundError("Không tìm thấy thương hiệu");
    brand.name = params.updateData.name;
    brand.image = params.updateData.image;
    brand.description = params.updateData.description;
    await brand.save();
    revalidatePath(params.path);
  } catch (error) {
    logger.error(error);
  }
}
