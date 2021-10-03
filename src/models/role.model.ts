import { Document, Schema, model } from 'mongoose';

export interface IRole extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Role = model<IRole>('Role', RoleSchema);
export default Role;
