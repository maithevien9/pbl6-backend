import { Document, Schema, model } from 'mongoose';

export interface IOrder extends Document {
  totalPrice: number;
  deliveryAddress: string;
  product: string[];
  user: string;
  status: IOrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type IOrderStatus =
  | typeof ORDER_STATUS.PENDING
  | typeof ORDER_STATUS.SHIPPING
  | typeof ORDER_STATUS.DONE
  | typeof ORDER_STATUS.PAID
  | typeof ORDER_STATUS.OVER;

export const ORDER_STATUS = {
  PENDING: 'pending',
  SHIPPING: 'shipping',
  DONE: 'done',
  OVER: 'over',
  PAID: 'paid',
};

const ProductSchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    product: [
      {
        type: 'ObjectId',
        ref: 'Product',
      },
    ],
    user: {
      type: 'ObjectId',
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: [
        ORDER_STATUS.PENDING,
        ORDER_STATUS.SHIPPING,
        ORDER_STATUS.DONE,
        ORDER_STATUS.PAID,
        ORDER_STATUS.OVER,
      ],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Order = model<IOrder>('Order', ProductSchema);
export default Order;
