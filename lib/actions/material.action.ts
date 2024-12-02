"use server";

import { revalidatePath } from "next/cache";

import Material from "@/database/material.model";

import { NotFoundError } from "../http-errors";
import logger from "../logger";
import dbConnect from "../mongoose";
import { slugify } from "../slugify";
import {
  CreateMaterialParams,
  DeleteMaterialParams,
  EditMaterialParams,
  GetMaterialByIdParams,
} from "./shared.types";

export async function createMaterial(params: CreateMaterialParams) {
  try {
    dbConnect();
    const { name, image, path, description } = params;
    const slug = slugify(name);
    const newMaterial = await Material.create({
      name,
      image,
      description,
      slug,
    });
    revalidatePath(path);
    return JSON.stringify(newMaterial);
  } catch (error) {
    logger.error(error);
  }
}
export async function getAllMaterials() {
  try {
    await dbConnect();
    const materials = await Material.find();
    if (!materials) throw new NotFoundError("Không tìm thấy bộ sưu tập nào");
    return JSON.stringify(materials);
  } catch (error) {
    logger.error(error);
  }
}

export async function deleteMaterial(params: DeleteMaterialParams) {
  try {
    await dbConnect();

    await Material.findByIdAndDelete({ _id: params.materialId });
    revalidatePath(params.path);
  } catch (error) {
    logger.error(error);
  }
}

export async function getMaterialById(params: GetMaterialByIdParams) {
  try {
    await dbConnect();
    const material = await Material.findById(params.materialId);
    if (!material) throw new NotFoundError("Không tìm thấy bộ sưu tập");
    return JSON.stringify(material);
  } catch (error) {
    logger.error(error);
  }
}

export async function editMaterial(params: EditMaterialParams) {
  try {
    await dbConnect();
    const material = await Material.findById(params.materialId);
    if (!material) throw new NotFoundError("Không tìm thấy bộ sưu tập");
    material.name = params.updateData.name;
    material.image = params.updateData.image;
    material.description = params.updateData.description;
    await material.save();
    revalidatePath(params.path);
  } catch (error) {
    logger.error(error);
  }
}
