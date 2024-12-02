"use server";
import mongoose, { FilterQuery, Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

import BrandProduct from "@/database/brand-product.model";
import Brand from "@/database/brand.model";
import CategoryProduct from "@/database/category-product.model";
import Category from "@/database/category.model";
import CollectionProduct from "@/database/collection-product.model";
import Collection from "@/database/collection.model";
import ColorProduct from "@/database/color-product.model";
import Color from "@/database/color.model";
import MaterialProduct from "@/database/material-product.model";
import Material from "@/database/material.model";
import Product from "@/database/product.model";
import TagProduct from "@/database/tag-product.model";
import Tag from "@/database/tag.model";

import logger from "../logger";
import dbConnect from "../mongoose";
import { slugify } from "../slugify";
import {
  CreateProductParams,
  DeleteProductParams,
  EditProductParams,
  GetAllProductsParams,
  GetProductByIdParams,
  GetProductBySlugParams,
} from "./shared.types";
import { NotFoundError } from "../http-errors";

export async function createProduct(params: CreateProductParams) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Kết nối đến database
    await dbConnect();

    const {
      title,
      description,
      content,
      price,
      salePrice,
      stock,
      collection,
      category,
      brand,
      material,
      colors,
      tags,
      specs,
      images,
    } = params;

    const slug = slugify(title);
    const featuredImage = images[0];
    const sku = uuidv4();

    // Tạo sản phẩm mới
    const [newProduct] = await Product.create(
      [
        {
          title,
          slug,
          description,
          content,
          price,
          salePrice,
          images,
          featuredImage,
          stock,
          categoryId: category,
          brandId: brand,
          collectionId: collection,
          materialId: material,
          sku,
          specs,
        },
      ],
      { session }
    );

    const productId = newProduct._id;
    const tagDocuments: Types.ObjectId[] = [];
    // Xử lý tags
    const tagPromises = tags.map(async (tag) => {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $inc: { products: 1 } },
        { upsert: true, new: true, session }
      );
      tagDocuments.push(existingTag._id);

      // Tạo bản ghi tag-product
      return TagProduct.create([{ tag: existingTag._id, product: productId }], {
        session,
      });
    });
    const colorDocuments: Types.ObjectId[] = [];
    // Xử lý colors
    const colorPromises = colors.map(async (color) => {
      const existingColor = await Color.findOneAndUpdate(
        { hex: color },
        { $inc: { products: 1 } },
        { upsert: true, new: true, session }
      );
      colorDocuments.push(existingColor._id);

      // Tạo bản ghi color-product
      return ColorProduct.create(
        [{ color: existingColor._id, product: productId }],
        { session }
      );
    });

    // Thực hiện song song các tác vụ xử lý tags và colors
    await Promise.all([...tagPromises, ...colorPromises]);

    newProduct.tags = tagDocuments;
    newProduct.colors = colorDocuments;
    await newProduct.save({ session });
    // Tăng số lượng sản phẩm trong các model liên quan
    const incrementPromises = [
      Brand.findByIdAndUpdate(brand, { $inc: { products: 1 } }, { session }),
      Category.findByIdAndUpdate(
        category,
        { $inc: { products: 1 } },
        { session }
      ),
      Material.findByIdAndUpdate(
        material,
        { $inc: { products: 1 } },
        { session }
      ),
      Collection.findByIdAndUpdate(
        collection,
        { $inc: { products: 1 } },
        { session }
      ),
    ];

    await Promise.all(incrementPromises);

    // Tạo các bản ghi liên kết
    const relationPromises = [
      CategoryProduct.create([{ category, product: productId }], { session }),
      MaterialProduct.create([{ material, product: productId }], { session }),
      CollectionProduct.create([{ collection, product: productId }], {
        session,
      }),
      BrandProduct.create([{ brand, product: productId }], { session }),
    ];

    await Promise.all(relationPromises);

    // Commit transaction
    await session.commitTransaction();
    await session.endSession();

    return JSON.stringify(newProduct);
  } catch (error) {
    // Rollback transaction in case of error
    await session.abortTransaction();
    await session.endSession();
    logger.error(error);
    throw new Error("Failed to create product");
  }
}
export async function getAllProducts(params: GetAllProductsParams) {
  try {
    await dbConnect();
    const { search, categories, sort, limit = 10, page = 1 } = params;
    // tính toán số lượng sản phẩm bỏ qua dựa trên trang hiện tại và limit
    const skipAmount = (page - 1) * limit;
    const categoryArray = categories ? categories.split(".") : [];

    const query: FilterQuery<typeof Product> = {};

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = [
        { title: { $regex: new RegExp(escapedSearch, "i") } },
        { description: { $regex: new RegExp(escapedSearch, "i") } },
        { content: { $regex: new RegExp(escapedSearch, "i") } },
      ];
    }
    if (categoryArray.length > 0) {
      query.categoryId = { $in: categoryArray };
    }
    let sortOptions = {};

    switch (sort) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "low_to_high":
        sortOptions = { price: 1 };
        break;
      case "high_to_low":
        sortOptions = { price: -1 };
        break;
      default:
        break;
    }
    const products = await Product.find(query)
      .populate({ path: "categoryId", select: "name", model: Category })
      .populate({ path: "brandId", select: "name", model: Brand })
      .populate({ path: "collectionId", select: "name", model: Collection })
      .populate({ path: "materialId", select: "name", model: Material })
      .populate({ path: "colors", select: "hex", model: Color })
      .populate({ path: "tags", select: "name", model: Tag })
      .skip(skipAmount)
      .limit(limit)
      .sort(sortOptions);
    const totalProducts = await Product.countDocuments(query);
    const isNext = totalProducts > skipAmount + products.length;

    return {
      products: JSON.stringify(products),
      isNext,
    };
  } catch (error) {
    logger.error(error);
  }
}

export async function getProductById(params: GetProductByIdParams) {
  try {
    await dbConnect();
    const product = await Product.findById(params.productId);
    if (!product) throw new NotFoundError("Không tìm thấy sản phẩm");
    return JSON.stringify(product);
  } catch (error) {
    logger.error(error);
  }
}

export async function editProduct(params: EditProductParams) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await dbConnect();
    const { productId, updateData, path } = params;
    const product = await Product.findById(productId).session(session);
    if (!product) throw new NotFoundError("Không tìm thấy sản phẩm");

    // lấy tất cả id cũ và mới của các relation field của product
    const oldCategory = product.categoryId.toString();
    const newCategory = updateData.category;

    const oldCollection = product.collectionId.toString();
    const newCollection = updateData.collection;

    const oldBrand = product.brandId.toString();
    const newBrand = updateData.brand;

    const oldMaterial = product.materialId.toString();
    const newMaterial = updateData.material;

    // nếu có thay đổi category, collection, brand, material thì cập nhật lại số lượng sản phẩm
    if (oldCategory !== newCategory) {
      // 1. xoá bản ghi category-product cũ
      await CategoryProduct.deleteOne({
        category: oldCategory,
        product: productId,
      }).session(session);
      // 2. Cập nhật lại số lượng sản phẩm của category cũ
      await Category.findByIdAndUpdate(oldCategory, {
        $inc: { products: -1 },
      }).session(session);
      // 3. thêm bản ghi category-product mới
      await CategoryProduct.create(
        [{ category: newCategory, product: productId }],
        { session }
      );
      // 4. Cập nhật lại số lượng sản phẩm của category mới
      await Category.findByIdAndUpdate(newCategory, {
        $inc: { products: 1 },
      }).session(session);
    }
    if (oldCollection !== newCollection) {
      // 1. xoá bản ghi collection-product cũ
      await CollectionProduct.deleteOne({
        collection: oldCollection,
        product: productId,
      }).session(session);
      // 2. Cập nhật lại số lượng sản phẩm của collection cũ
      await Collection.findByIdAndUpdate(oldCollection, {
        $inc: { products: -1 },
      }).session(session);
      // 3. thêm bản ghi collection-product mới
      await CollectionProduct.create(
        [{ collection: newCollection, product: productId }],
        { session }
      );
      // 4. Cập nhật lại số lượng sản phẩm của collection mới
      await Collection.findByIdAndUpdate(newCollection, {
        $inc: { products: 1 },
      }).session(session);
    }

    if (oldBrand !== newBrand) {
      // 1. xoá bản ghi brand-product cũ
      await Brand.deleteOne({
        brand: oldBrand,
        product: productId,
      }).session(session);
      // 2. Cập nhật lại số lượng sản phẩm của brand cũ
      await Brand.findByIdAndUpdate(oldBrand, {
        $inc: { products: -1 },
      }).session(session);
      // 3. thêm bản ghi brand-product mới
      await Brand.create([{ brand: newBrand, product: productId }], {
        session,
      });
      // 4. Cập nhật lại số lượng sản phẩm của brand mới
      await Brand.findByIdAndUpdate(newBrand, {
        $inc: { products: 1 },
      }).session(session);
    }

    if (oldMaterial !== newMaterial) {
      // 1. xoá bản ghi material-product cũ
      await MaterialProduct.deleteOne({
        material: oldMaterial,
        product: productId,
      }).session(session);
      // 2. Cập nhật lại số lượng sản phẩm của material cũ
      await Material.findByIdAndUpdate(oldMaterial, {
        $inc: { products: -1 },
      }).session(session);
      // 3. thêm bản ghi material-product mới
      await MaterialProduct.create(
        [{ material: newMaterial, product: productId }],
        { session }
      );
      // 4. Cập nhật lại số lượng sản phẩm của material mới
      await Material.findByIdAndUpdate(newMaterial, {
        $inc: { products: 1 },
      }).session(session);
    }

    // cập nhật thông tin sản phẩm
    product.title = updateData.title;
    product.slug = slugify(updateData.title);
    product.description = updateData.description;
    product.content = updateData.content;
    product.price = updateData.price;
    product.salePrice = updateData.salePrice;
    product.images = updateData.images;
    product.featuredImage = updateData.images[0];
    product.stock = updateData.stock;
    product.categoryId = newCategory;
    product.brandId = newBrand;
    product.collectionId = newCollection;
    product.materialId = newMaterial;
    product.specs = updateData.specs;

    await product.save({ session });
    // Commit transaction
    await session.commitTransaction();
    await session.endSession();
    revalidatePath(path);
  } catch (error) {
    // Rollback transaction in case of error
    await session.abortTransaction();
    await session.endSession();
    logger.error(error);
    throw new Error("Failed to edit product");
  }
}

export async function deleteProduct(params: DeleteProductParams) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await dbConnect();
    const { productId, path } = params;
    const product = await Product.findById(productId).session(session);
    if (!product) throw new NotFoundError("Không tìm thấy sản phẩm");
    const categoryId = product.categoryId;
    const collectionId = product.collectionId;
    const brandId = product.brandId;
    const materialId = product.materialId;
    // giảm số lượng sản phẩm trong các model liên quan
    const decrementPromises = [
      Brand.findByIdAndUpdate(brandId, { $inc: { products: -1 } }, { session }),
      Category.findByIdAndUpdate(
        categoryId,
        { $inc: { products: -1 } },
        { session }
      ),
      Material.findByIdAndUpdate(
        materialId,
        { $inc: { products: -1 } },
        { session }
      ),
      Collection.findByIdAndUpdate(
        collectionId,
        { $inc: { products: -1 } },
        { session }
      ),
    ];
    await Promise.all(decrementPromises);

    // xoá tất cả bản ghi liên quan tới product này
    const deleteRelationPromises = [
      CategoryProduct.deleteOne({ product: productId }).session(session),
      BrandProduct.deleteOne({ product: productId }).session(session),
      MaterialProduct.deleteOne({ product: productId }).session(session),
      CollectionProduct.deleteOne({ product: productId }).session(session),
    ];
    await Promise.all(deleteRelationPromises);
    // Tìm và giảm số lượng sản phẩm của các tag và color liên quan
    const tagPromises = product.tags.map(async (tagId: Types.ObjectId) => {
      const tag = await Tag.findByIdAndUpdate(
        tagId,
        { $inc: { products: -1 } },
        { session }
      );
      // xoá bản ghi tag-product này
      await TagProduct.deleteOne({ tag: tagId, product: productId }).session(
        session
      );
    });
    await Promise.all(tagPromises);
    const colorPromises = product.colors.map(
      async (colorId: Types.ObjectId) => {
        const color = await Color.findByIdAndUpdate(
          colorId,
          { $inc: { products: -1 } },
          { session }
        );
        // xoá bản ghi color-product này
        await ColorProduct.deleteOne({
          color: colorId,
          product: productId,
        }).session(session);
      }
    );
    await Promise.all(colorPromises);
    // xoá sản phẩm
    await Product.findByIdAndDelete(productId).session(session);
    // Commit transaction
    await session.commitTransaction();
    await session.endSession();
    revalidatePath(path);
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    logger.error(error);
  }
}

export async function getProductBySlug(params: GetProductBySlugParams) {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug: params.slug })
      .populate({ path: "categoryId", select: "name", model: Category })
      .populate({ path: "brandId", select: "name", model: Brand })
      .populate({ path: "collectionId", select: "name", model: Collection })
      .populate({ path: "materialId", select: "name", model: Material })
      .populate({ path: "tags", select: "name", model: Tag })
      .populate({ path: "colors", select: "hex", model: Color });
    if (!product) throw new NotFoundError("Không tìm thấy sản phẩm");
    return JSON.stringify(product);
  } catch (error) {
    logger.error(error);
  }
}
