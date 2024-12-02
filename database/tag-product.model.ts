import { models, model, Schema, Types, Document } from "mongoose";

export interface ITagProduct extends Document {
  tag: Types.ObjectId;
  product: Types.ObjectId;
}

const TagProductSchema = new Schema<ITagProduct>({
  tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const TagProduct =
  models?.TagProduct || model<ITagProduct>("TagProduct", TagProductSchema);
export default TagProduct;
