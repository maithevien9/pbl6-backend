import { Response, NextFunction } from 'express';
import { Query, Request, Params } from '../types';

import { IUser, IVerify } from '../models';
import { AuthService } from '../services';
import httpStatus from 'http-status';

interface IRequestBodyRegister {
  email: IUser['email'];
  password: IUser['password'];
  fullName: IUser['fullName'];
}

interface IRequestBodyVerifyEmail {
  email: IUser['email'];
  otp: IVerify['otp'];
}

interface IRequestBodyRefreshOtp {
  email: IUser['email'];
}

interface IRequestBodyLogin {
  email: IUser['email'];
  password: IUser['password'];
}

class AuthController {
  static register = async (
    req: Request<IRequestBodyRegister, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await AuthService.register({ ...req.body });
      res.status(httpStatus.CREATED).end();
    } catch (e) {
      return next(e);
    }
  };

  static verifyEmail = async (
    req: Request<IRequestBodyVerifyEmail, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await AuthService.verifyEmail({ ...req.body });
      res.status(httpStatus.OK).end();
    } catch (e) {
      return next(e);
    }
  };

  static refreshOtp = async (
    req: Request<IRequestBodyRefreshOtp, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await AuthService.refreshOtp({ ...req.body });
      res.status(httpStatus.OK).end();
    } catch (e) {
      return next(e);
    }
  };

  static login = async (
    req: Request<IRequestBodyLogin, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { user, token } = await AuthService.login({ ...req.body });
      res.status(httpStatus.OK).json({
        user,
        token,
      });
    } catch (e) {
      return next(e);
    }
  };
}

export default AuthController;
