import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  brand: string;
  category: string;
  url: string;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;