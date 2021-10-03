import { Response, NextFunction } from 'express';
import { Query, Request, Params } from '../types';

import { IUser } from '../models';
import { AuthService } from '../services';
import httpStatus from 'http-status';

interface IRequestBodyRegister {
  email: IUser['email'];
  password: IUser['password'];
  fullName: IUser['fullName'];
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
}

export default AuthController;
