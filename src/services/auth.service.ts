import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import moment from 'moment';

import configs from '../configs';
import { User, Verify, Role, IUserTransformed } from '../models';
import APIError from '../utils/APIError';
import generateOTP from '../utils/GenerateOTP';
import sendEmail from '../utils/SendEmail';
import JWT from '../utils/jwt';

interface IRegisterParams {
  email: string;
  password: string;
  fullName: string;
}

interface IVerifyEmailParams {
  otp: string;
  email: string;
}

interface IRefreshOtpParams {
  email: string;
}

interface IForgotPasswordParams {
  email: string;
}
interface ILoginParams {
  email: string;
  password: string;
}

interface IResetPasswordParams {
  otp: string;
  email: string;
  password: string;
}

class AuthService {
  static register = async ({
    email,
    password,
    fullName,
  }: IRegisterParams): Promise<void> => {
    const user = await User.findOne({ email });

    if (user) {
      throw new APIError({
        message: 'Email already exists',
        status: httpStatus.BAD_REQUEST,
      });
    }

    const passwordHashed = await bcrypt.hash(
      password,
      configs.bcryptSaltRounds,
    );

    const role = await Role.findOne({ name: 'Customer' });

    if (!role) {
      throw new APIError({
        message: 'Internal server error',
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }

    await User.create({
      email,
      password: passwordHashed,
      fullName,
      role: role._id,
    });

    const otp = generateOTP();
    const expiredAt = moment().add(5, 'minutes');

    await Verify.create({ email, otp, expiredAt });
    await sendEmail(email, otp);
  };

  static verifyEmail = async ({
    otp,
    email,
  }: IVerifyEmailParams): Promise<void> => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new APIError({
        message: 'User not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    const verify = await Verify.findOne({ email }).sort({ _id: -1 }).limit(1);

    if (verify && verify.otp !== otp) {
      throw new APIError({
        message: 'Invalid OTP',
        status: httpStatus.BAD_REQUEST,
      });
    }

    if (!verify) {
      throw new APIError({
        message: 'Invalid OTP',
        status: httpStatus.BAD_REQUEST,
      });
    }

    if (verify.verifiedAt) {
      throw new APIError({
        message: 'OTP code was verified before',
        status: httpStatus.BAD_REQUEST,
      });
    }

    if (moment().isAfter(verify.expiredAt)) {
      throw new APIError({
        message: 'OTP code was expired',
        status: httpStatus.BAD_REQUEST,
      });
    }

    await Verify.findOneAndUpdate({ email }, { verifiedAt: new Date() });
    await User.findOneAndUpdate({ email }, { isVerify: true });
  };

  static refreshOtp = async ({ email }: IRefreshOtpParams): Promise<void> => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new APIError({
        message: 'User not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    const otp = generateOTP();
    const expiredAt = moment().add(5, 'minutes');

    await sendEmail(email, otp);
    await Verify.create({ email, otp, expiredAt });
  };

  static login = async ({
    email,
    password,
  }: ILoginParams): Promise<{
    user: IUserTransformed;
    token: string;
  }> => {
    const user = await User.findOne({ email, isVerify: true }).populate({
      path: 'role',
      select: 'name',
    });

    if (!user) {
      throw new APIError({
        message: 'This email is not registered',
        status: httpStatus.NOT_FOUND,
      });
    }

    const isMatchPassword = await user.comparePassword(password);

    if (!isMatchPassword) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: 'Password is invalid',
      });
    }

    if (!isMatchPassword) {
      throw new APIError({
        message: 'Invalid password',
        status: httpStatus.BAD_REQUEST,
      });
    }

    const token = JWT.sign({ _id: user._id });

    return {
      user: user.transform(),
      token,
    };
  };

  static forgotPassword = async ({
    email,
  }: IForgotPasswordParams): Promise<void> => {
    const user = await User.findOne({ email, isVerify: true });

    if (!user) {
      throw new APIError({
        message: 'User not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    const otp = generateOTP();
    const expiredAt = moment().add(5, 'minutes');

    await Verify.create({ email, otp, expiredAt });
    await sendEmail(email, otp);
  };

  static resetPassword = async ({
    otp,
    email,
    password,
  }: IResetPasswordParams): Promise<void> => {
    const verify = await Verify.findOne({ email }).sort({ _id: -1 }).limit(1);

    if (!verify) {
      throw new APIError({
        message: 'User not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    if (verify && verify.otp !== otp) {
      throw new APIError({
        message: 'Invalid OTP',
        status: httpStatus.BAD_REQUEST,
      });
    }

    if (moment().isAfter(verify.expiredAt)) {
      throw new APIError({
        message: 'OTP code was expired',
        status: httpStatus.BAD_REQUEST,
      });
    }

    const passwordHashed = await bcrypt.hash(
      password,
      configs.bcryptSaltRounds,
    );

    await User.updateOne({ email }, { password: passwordHashed });
  };
}

export default AuthService;
