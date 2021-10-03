import { RequestHandler } from 'express';
import { RoleService } from '../services';

class RoleController {
  static getAll: RequestHandler = async (req, res, next) => {
    try {
      const roles = await RoleService.getAll();
      return res.json(roles);
    } catch (e) {
      return next(e);
    }
  };
}

export default RoleController;
