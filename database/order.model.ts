import { model, models, Schema, Types } from "mongoose";

export interface IOrder extends Document {
  user?: Types.ObjectId | null;
  items: { product: Types.ObjectId; quantity: number; price: number }[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  customerInfo: {
    name: string;
    phoneNumber: string;
    address: {
      province: string;
      district: string;
      ward: string;
      detail: string;
    };
    paymentMethod: "cash" | "bank";
    notes?: string;
  };
}

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    customerInfo: {
      name: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      address: {
        province: {
          type: String,
          required: true,
        },
        district: {
          type: String,
          required: true,
        },
        ward: {
          type: String,
          required: true,
        },
        detail: {
          type: String,
          required: true,
        },
      },
      paymentMethod: {
        type: String,
        enum: ["cash", "bank"],
        required: true,
      },
      notes: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Order = models.Order || model<IOrder>("Order", OrderSchema);
export default Order;
