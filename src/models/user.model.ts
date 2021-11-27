import { Document, Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  gender: IGender;
  fullName: string;
  role: string;
  address: string;
  phoneNumber: string;
  avatar: string;
  isVerify: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  transform: () => IUserTransformed;
}

export type IUserTransformed = Omit<
  IUser,
  'password' | 'comparePassword' | 'transform'
>;

export type IGender = typeof GENDER.FEMALE | typeof GENDER.MALE;

export const GENDER = {
  MALE: 1,
  FEMALE: 2,
};

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    gender: {
      type: String,
      enum: [GENDER.FEMALE, GENDER.MALE],
    },
    fullName: {
      type: String,
      required: true,
    },
    role: {
      type: 'ObjectId',
      ref: 'Role',
      required: true,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    avatar: {
      type: String,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  const user = this as IUser;
  return bcrypt.compare(candidatePassword, user.password);
};

UserSchema.methods.transform = function () {
  const transformed: Partial<IUserTransformed> = {};
  const user = this as IUser;

  const fields = [
    '_id',
    'email',
    'fullName',
    'role',
    'gender',
    'phoneNumber',
    'avatar',
    'address',
    'createdAt',
    'updatedAt',
  ];

  fields.forEach((field) => {
    // @ts-ignore
    transformed[field] = user.get(field);
  });

  return transformed;
};

const User = model<IUser>('User', UserSchema);
export default User;
