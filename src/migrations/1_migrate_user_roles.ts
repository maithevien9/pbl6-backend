import connectToDb from '../configs/mongoose';
import { Role } from '../models';

connectToDb();

export const migrate = async (client: any, done: any) => {
  const roles = [
    { name: 'Admin' },
    { name: 'Manager' },
    { name: 'Cooperator' },
    { name: 'customer' },
  ];

  await Role.insertMany(roles);
  done();
};

export const rollback = async (client: any, done: any) => {
  done();
};
