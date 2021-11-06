import { Document, Schema, model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  avatar: string;
  photos: string[];
  shop: string;
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
      type: 'ObjectId',
      ref: 'Category',
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
    shop: {
      type: 'ObjectId',
      ref: 'Shop',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Product = model<IProduct>('Product', ProductSchema);
export default Product;
