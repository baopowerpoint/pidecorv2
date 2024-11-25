import { models, model, Document, Types, Schema } from "mongoose";

export interface IPatternProduct extends Document {
  pattern: Types.ObjectId;
  product: Types.ObjectId;
}

const PatternProductSchema = new Schema<IPatternProduct>({
  pattern: { type: Schema.Types.ObjectId, ref: "Pattern", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const PatternProduct =
  models.PatternProduct ||
  model<IPatternProduct>("PatternProduct", PatternProductSchema);
export default PatternProduct;
