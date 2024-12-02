import { models, model, Document, Schema, Types } from "mongoose";

export interface ICollection extends Document {
  name: string;
  slug: string;
  category: Types.ObjectId;
  description: string;
  image: string;
  products: number;
}

const CollectionSchema = new Schema<ICollection>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String, required: true },
    products: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Collection =
  models?.Collection || model<ICollection>("Collection", CollectionSchema);
export default Collection;
