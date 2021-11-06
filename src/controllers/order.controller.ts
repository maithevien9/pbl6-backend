import { Response, NextFunction } from 'express';
import { Query, Request, Params } from '../types';
import { IOrder } from '../models';

import { OrderService } from '../services';

type IRequestBodyCreateOrder = Omit<IOrder, 'createdAt' | 'updatedAt'>;

type IRequestBodyUpdateOrder = Omit<IOrder, 'createdAt' | 'updatedAt'>;

class ShopController {
  static create = async (
    req: Request<IRequestBodyCreateOrder, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const product = await OrderService.create({
        user: req.user,
        body: req.body,
      });
      res.json(product);
    } catch (e) {
      return next(e);
    }
  };

  static update = async (
    req: Request<IRequestBodyUpdateOrder, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const shop = await OrderService.update({
        orderId: req.params.id,
        body: req.body,
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
      const shops = await OrderService.getAll({
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

  static getByUser = async (
    req: Request<never, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const shops = await OrderService.getByUser({
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
