import { Response, NextFunction } from 'express';
import { Query, Request, Params } from '../types';

import { RoleService } from '../services';

class RoleController {
  static getAll = async (
    req: Request<never, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const roles = await RoleService.getAll();
      res.json(roles);
    } catch (e) {
      return next(e);
    }
  };
}

export default RoleController;
