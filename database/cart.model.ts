import { Schema, models, model, Document } from "mongoose";

export interface ICart extends Document {
  userId: string;
  cartId: string;
  items: Schema.Types.ObjectId[];
  totalItems: number;
  totalPrice: number;
}

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: String,
      required: true,
      default: null,
    },
    cartId: {
      type: String,
      required: true,
    },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalItems: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = models.Cart || model<ICart>("Cart", CartSchema);

export default Cart;
