import { models, model, Schema, Document, Types } from "mongoose";

export interface IMaterialProduct extends Document {
  material: Types.ObjectId;
  product: Types.ObjectId;
}

const MaterialProductSchema = new Schema<IMaterialProduct>({
  material: { type: Schema.Types.ObjectId, ref: "Material", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const MaterialProduct =
  models.MaterialProduct ||
  model<IMaterialProduct>("MaterialProduct", MaterialProductSchema);
export default MaterialProduct;
