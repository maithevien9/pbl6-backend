import { Response, NextFunction } from 'express';
import { Query, Request, Params } from '../types';
import { IShop } from '../models';

import { ShopService } from '../services';

type IRequestBodyCreateShop = Pick<IShop, 'name' | 'avatar' | 'address'>;

type IRequestBodyUpdateShop = Pick<IShop, 'name' | 'avatar' | 'address'>;

interface IRequestBodyDeleteShop {
  orderId: string;
}

class ShopController {
  static create = async (
    req: Request<IRequestBodyCreateShop, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const shop = await ShopService.create({
        user: req.user,
        body: req.body,
      });
      res.json(shop);
    } catch (e) {
      return next(e);
    }
  };

  static update = async (
    req: Request<IRequestBodyUpdateShop, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const shop = await ShopService.update({
        orderId: req.params.id,
        body: req.body,
      });
      res.json(shop);
    } catch (e) {
      return next(e);
    }
  };

  static delete = async (
    req: Request<IRequestBodyDeleteShop, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const shop = await ShopService.delete({
        orderId: req.params.id,
      });
      res.json(shop);
    } catch (e) {
      return next(e);
    }
  };

  static getAll = async (
    req: Request<never, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const shops = await ShopService.getAll({
        user: req.user,
        pagination: {
          limit: Number(req.query.limit),
          skip: req.skip || 0,
        },
      });
      res.json(shops);
    } catch (e) {
      return next(e);
    }
  };
}

export default ShopController;
