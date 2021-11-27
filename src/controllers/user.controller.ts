import { Response, NextFunction } from 'express';
import { UserService } from '../services';
import { Query, Request, Params } from '../types';
import { IUser } from '../models';

interface IRequestBodyChangePassword {
  password: IUser['password'];
  oldPassword: IUser['password'];
}

interface IRequestBodyUpdateInformation {
  gender?: IUser['gender'];
  fullName?: IUser['fullName'];
  role?: IUser['role'];
  address?: IUser['address'];
  phoneNumber?: IUser['phoneNumber'];
  avatar?: IUser['avatar'];
}

class AuthController {
  static getMe = async (
    req: Request<never, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await UserService.getMe({
        userId: req.user._id,
      });
      res.json(user);
    } catch (e) {
      next(e);
    }
  };

  static changePassword = async (
    req: Request<IRequestBodyChangePassword, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await UserService.changePassword({
        user: req.user,
        ...req.body,
      });
      res.end();
    } catch (e) {
      next(e);
    }
  };

  static updateInformation = async (
    req: Request<IRequestBodyUpdateInformation, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await UserService.updateInformation({
        userId: req.user._id,
        ...req.body,
      });
      res.json(user);
    } catch (e) {
      next(e);
    }
  };
}

export default AuthController;
