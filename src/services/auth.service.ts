import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import moment from 'moment';

import configs from '../configs';
import { User, Verify } from '../models';
import APIError from '../utils/APIError';
import generateOTP from '../utils/GenerateOTP';
import sendEmail from '../utils/SendEmail';

interface IRegisterParams {
  email: string;
  password: string;
  fullName: string;
  role: string;
}

class AuthService {
  static register = async ({
    email,
    password,
    fullName,
    role,
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

    await User.create({
      email,
      password: passwordHashed,
      fullName,
      role,
    });

    const otp = generateOTP();
    const expiredAt = moment().add(5, 'minutes');

    await Verify.create({ email, otp, expiredAt });
    await sendEmail(email, otp);
  };
}

export default AuthService;
