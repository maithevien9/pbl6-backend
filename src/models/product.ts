import { Document, Schema, model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  avatar: string;
  photos: string[];
  shop: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    photos: [
      {
        type: String,
      },
    ],
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Product = model<IProduct>('Product', ProductSchema);
export default Product;
