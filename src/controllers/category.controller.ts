import { Response, NextFunction } from 'express';
import { Query, Request, Params } from '../types';

import { CategoryService } from '../services';

class CategoryController {
  static getAll = async (
    req: Request<never, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const categories = await CategoryService.getAll();
      res.json(categories);
    } catch (e) {
      return next(e);
    }
  };
}

export default CategoryController;
