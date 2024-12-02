import { Schema, models, model, Document } from "mongoose";

export interface IProductSale extends Document {
  productId: Schema.Types.ObjectId;
  quantity: number;
  salePrice: number;
  saleDate: Date;
}

const ProductSaleSchema = new Schema<IProductSale>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    saleDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const ProductSale =
  models?.ProductSale || model("ProductSale", ProductSaleSchema);

export default ProductSale;
