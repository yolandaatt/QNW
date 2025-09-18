import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
  category?: string;
  inStock: boolean;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

export default model<IProduct>("Product", productSchema);
