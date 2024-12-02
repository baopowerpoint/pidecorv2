import { models, model, Schema, Document, Types } from "mongoose";

export interface IBrandProduct extends Document {
  brand: Types.ObjectId;
  product: Types.ObjectId;
}

const BrandProductSchema = new Schema<IBrandProduct>({
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const BrandProduct =
  models?.BrandProduct ||
  model<IBrandProduct>("BrandProduct", BrandProductSchema);
export default BrandProduct;
