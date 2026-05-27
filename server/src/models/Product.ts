import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
  category?: string;
  stock: number;
  inStock: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: false, default: "" },
    description: { type: String },
    category: { type: String },
    stock: { type: Number, required: true, default: 10, min: 0 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

productSchema.pre("save", function () {
  this.inStock = this.stock > 0;
});

productSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate() as { stock?: number; inStock?: boolean };
  if (update?.stock !== undefined) {
    update.inStock = update.stock > 0;
  }
});

export default model<IProduct>("Product", productSchema);
