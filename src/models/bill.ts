import { Document, Schema, model } from 'mongoose';

export interface IBill extends Document {
  requestId: string;
  orderId: string;
  amount: string;
  message: string;
  order: string;
  responseAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BillSchema = new Schema(
  {
    requestId: {
      type: String,
      require: true,
    },
    orderId: {
      type: String,
      require: true,
    },
    order: {
      type: 'ObjectId',
      ref: 'Order',
      required: true,
    },
    message: {
      type: String,
    },
    responseAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Bill = model<IBill>('Bill', BillSchema);
export default Bill;
