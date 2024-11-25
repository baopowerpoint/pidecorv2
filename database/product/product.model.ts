import { model, models, Schema, Document, Types } from "mongoose";

interface IMotorSpecifications {
  power?: string;
  voltage?: string;
  speed?: string;
  noiseLevel?: string;
  brand?: string;
  model?: string;
  warranty?: string;
}
export interface IProduct extends Document {
  productType?: string;
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
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  materialId: Types.ObjectId[];
  colorId?: Types.ObjectId[];
  patternId?: Types.ObjectId[];
  brandId: Types.ObjectId;
  categoryId: Types.ObjectId;
  collectionId: Types.ObjectId;
  onSale: boolean;
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  tags?: Types.ObjectId[];
  reviewsCounts: number;
  averageRating: number;
  motorSpecifications?: IMotorSpecifications; // Thông số động cơ (nếu có)
}
const MotorSpecificationsSchema = new Schema<IMotorSpecifications>({
  power: { type: String },
  voltage: { type: String },
  speed: { type: String },
  noiseLevel: { type: String },
  brand: { type: String },
  model: { type: String },
  warranty: { type: String },
});

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
    sku: { type: String, required: false, default: null, unique: true },
    stock: { type: Number, default: 0 },
    dimensions: {
      length: { type: Number, default: 0 },
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
    },
    materialId: [{ type: Schema.Types.ObjectId, ref: "Material" }],
    patternId: [{ type: Schema.Types.ObjectId, ref: "Pattern" }],
    brandId: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
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
    colorId: [{ type: Schema.Types.ObjectId, ref: "Color" }],
    onSale: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    reviewsCounts: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    motorSpecifications: MotorSpecificationsSchema, // Subdocument cho thông số động cơ
  },
  { timestamps: true }
);

const Product = models.Product || model<IProduct>("Product", ProductSchema);
export default Product;
