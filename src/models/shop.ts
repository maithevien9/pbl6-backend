import { Document, Schema, model } from 'mongoose';

export interface IShop extends Document {
  name: string;
  avatar: string;
  address: string;
  isAccept: boolean;
  isDeleted: boolean;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

const ShopSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: 'ObjectId',
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Shop = model<IShop>('Shop', ShopSchema);
export default Shop;
