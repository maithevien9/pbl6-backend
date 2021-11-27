import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

import { User, IUser, IUserTransformed } from '../models';
import APIError from '../utils/APIError';
import log from '../utils/logger';
import configs from '../configs';

interface IGetMeParams {
  userId: IUser['_id'];
}

interface IChangePasswordParams {
  user: IUser;
  password: IUser['password'];
  oldPassword: IUser['password'];
}

interface IUpdateInformationParams {
  userId: IUser['_id'];
  gender?: IUser['gender'];
  fullName?: IUser['fullName'];
  role?: IUser['role'];
  address?: IUser['address'];
  phoneNumber?: IUser['phoneNumber'];
  avatar?: IUser['avatar'];
}

class AuthService {
  static getMe = async ({
    userId,
  }: IGetMeParams): Promise<IUserTransformed> => {
    const user = await User.findById(userId).populate({
      path: 'role',
      select: 'name',
    });

    if (!user) {
      log.error('User not found');
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'User not found',
      });
    }

    return user.transform();
  };

  static changePassword = async ({
    user,
    password,
    oldPassword,
  }: IChangePasswordParams): Promise<void> => {
    const isMatchPassword = await user.comparePassword(oldPassword);

    if (!isMatchPassword) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: 'Old password not match',
      });
    }

    user.password = await bcrypt.hash(password, configs.bcryptSaltRounds);
    await user.save();
  };

  static updateInformation = async ({
    userId,
    ...payload
  }: IUpdateInformationParams): Promise<IUserTransformed> => {
    const userUpdated = await User.findByIdAndUpdate(userId, payload);

    if (!userUpdated) {
      log.error('Can not update information');
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'Can not update information',
      });
    }

    const user = await User.findById(userId).populate({
      path: 'role',
      select: 'name',
    });

    if (!user) {
      log.error('User not found');
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'User not found',
      });
    }

    return user.transform();
  };
}

export default AuthService;
