import httpStatus from 'http-status';
import { IProduct, Product } from '../models';
import APIError from '../utils/APIError';

interface ICreateProductParams {
  body: Omit<IProduct, 'createdAt' | 'updatedAt'>;
}

interface IUpdateProductParams {
  productId: string;
  body: Omit<IProduct, 'createdAt' | 'updatedAt'>;
}

interface IGetProductsParams {
  query: {
    limit: number;
    skip: number;
    category?: string;
  };
}

interface IGetProductParams {
  id: string;
}

interface IGetProductByShopParams {
  shopId: string;
  pagination: Express.Pagination;
}

interface IProductConditionGetAll {
  category?: string;
}
class ShopService {
  static create = async ({ body }: ICreateProductParams): Promise<IProduct> => {
    return Product.create(body);
  };

  static update = async ({
    body,
    productId,
  }: IUpdateProductParams): Promise<IProduct> => {
    const shop = await Product.findById(productId);

    if (!shop) {
      throw new APIError({
        message: 'Product not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    const productUpdated = await Product.findByIdAndUpdate(productId, body, {
      new: true,
    });

    if (!productUpdated) {
      throw new APIError({
        message: 'Can not update order',
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }

    return productUpdated;
  };

  static getOne = async ({ id }: IGetProductParams): Promise<IProduct> => {
    const product = await Product.findById(id).populate([
      { path: 'shop', select: 'name avatar address' },
      { path: 'category', select: 'name' },
    ]);

    if (!product) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }

    return product;
  };

  static getAll = async ({
    query,
  }: IGetProductsParams): Promise<IProduct[]> => {
    const { limit, skip, category } = query;
    const productConditions: IProductConditionGetAll = {};

    if (category) {
      productConditions.category = category;
    }

    return Product.find({ ...productConditions })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate([
        { path: 'shop', select: 'name avatar address' },
        { path: 'category', select: 'name' },
      ])
      .lean();
  };

  static getByShop = async ({
    shopId,
    pagination,
  }: IGetProductByShopParams): Promise<IProduct[]> => {
    const { limit, skip } = pagination;
    return Product.find({ shop: shopId })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate([
        { path: 'shop', select: 'name avatar address' },
        { path: 'category', select: 'name' },
      ])
      .lean();
  };
}

export default ShopService;
