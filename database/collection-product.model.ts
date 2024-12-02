import { model, models, Schema, Types, Document } from "mongoose";

export interface IProductCollection {
  collection: Types.ObjectId;
  product: Types.ObjectId;
}
const ProductCollectionSchema = new Schema<IProductCollection>(
  {
    collection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  {
    timestamps: true,
  }
);

const ProductCollection =
  models?.ProductCollection ||
  model<IProductCollection>("ProductCollection", ProductCollectionSchema);

export default ProductCollection;
