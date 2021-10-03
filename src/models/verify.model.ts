import { Document, Schema, model } from 'mongoose';

export interface IVerify extends Document {
  otp: string;
  email: string;
  verifiedAt: Date;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VerifySchema = new Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    verifiedAt: {
      type: Date,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

const Verify = model<IVerify>('Verify', VerifySchema);
export default Verify;
