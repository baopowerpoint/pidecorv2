import { models, model, Schema, Types } from "mongoose";

export interface ICategoryProduct {
  category: Types.ObjectId;
  product: Types.ObjectId;
}

const CategoryProductSchema = new Schema<ICategoryProduct>({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const CategoryProduct =
  models?.CategoryProduct ||
  model<ICategoryProduct>("CategoryProduct", CategoryProductSchema);
export default CategoryProduct;
