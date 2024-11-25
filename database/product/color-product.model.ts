import { models, model, Types, Document, Schema } from "mongoose";

export interface IColorProduct extends Document {
  color: Types.ObjectId;
  product: Types.ObjectId;
}

const ColorProductSchema = new Schema<IColorProduct>({
  color: { type: Schema.Types.ObjectId, ref: "Color", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const ColorProduct =
  models.ColorProduct ||
  model<IColorProduct>("ColorProduct", ColorProductSchema);
export default ColorProduct;
