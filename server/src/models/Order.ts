import { Schema, model, Document, Types } from "mongoose";

interface OrderItem {
  productId: Types.ObjectId;
  title: string;
  price: number;
  quantity: number;
}

interface DeliveryAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: OrderItem[];
  deliveryAddress: DeliveryAddress;
  phone: string;
  paymentMethod: "card" | "swish" | "invoice";
  totalPrice: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    phone: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["card", "swish", "invoice"],
      required: true,
    },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default model<IOrder>("Order", OrderSchema);
