import { models, model, Schema, Types, Document } from "mongoose";

export interface ITagBlog extends Document {
  tag: Types.ObjectId;
  blog: Types.ObjectId;
}

const TagBlogSchema = new Schema<ITagBlog>({
  tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
  blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
});

const TagBlog = models?.TagBlog || model<ITagBlog>("TagBlog", TagBlogSchema);
export default TagBlog;
