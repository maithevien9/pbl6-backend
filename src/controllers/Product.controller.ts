import { Response, NextFunction } from 'express';
import { Query, Request, Params } from '../types';
import { IProduct } from '../models';

import { ProductService } from '../services';

type IRequestBodyCreateProduct = Omit<IProduct, 'createdAt' | 'updatedAt'>;

type IRequestBodyUpdateProduct = Omit<IProduct, 'createdAt' | 'updatedAt'>;

class ShopController {
  static create = async (
    req: Request<IRequestBodyCreateProduct, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const product = await ProductService.create({
        body: req.body,
      });
      res.json(product);
    } catch (e) {
      return next(e);
    }
  };

  static update = async (
    req: Request<IRequestBodyUpdateProduct, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const shop = await ProductService.update({
        productId: req.params.id,
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
      const shops = await ProductService.getAll({
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

  static getByShop = async (
    req: Request<never, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const shops = await ProductService.getByShop({
        shopId: req.params.id,
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
