import { model, models, Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  images: string[];
  featuredImage: string;
  price: number;
  salePrice: number;
  sku: string;
  stock: number;
  materialId: Types.ObjectId;
  brandId: Types.ObjectId;
  categoryId: Types.ObjectId;
  collectionId: Types.ObjectId;
  onSale: boolean;
  isFeatured: boolean;
  reviewsCounts: number;
  averageRating: number;
  tags: Types.ObjectId[];
  colors: Types.ObjectId[];
  specs?: { name: string; value: string }[];
}

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String, default: [] }],
    featuredImage: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    sku: { type: String, required: false, default: null },
    stock: { type: Number, default: 0 },
    materialId: { type: Schema.Types.ObjectId, ref: "Material" },
    brandId: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    colors: [{ type: Schema.Types.ObjectId, ref: "Color" }],
    specs: {
      type: [
        {
          name: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
      default: null,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    onSale: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: true },

    reviewsCounts: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = models?.Product || model<IProduct>("Product", ProductSchema);
export default Product;
