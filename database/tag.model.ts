import { models, model, Schema, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  slug: string;
  products: number;
  blogs: number;
}

const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    products: { type: Number, default: 0 },
    blogs: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Tag = models.Tag || model<ITag>("Tag", TagSchema);
export default Tag;
