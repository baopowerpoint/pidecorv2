import { models, model, Document, Types, Schema } from "mongoose";

export interface ICollectionBlog extends Document {
  collectionId: Types.ObjectId;
  blogId: Types.ObjectId;
}

const collectionBlogSchema = new Schema<ICollectionBlog>({
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
    required: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
});

const CollectionBlog =
  models?.CollectionBlog ||
  model<ICollectionBlog>("CollectionBlog", collectionBlogSchema);
export default CollectionBlog;
