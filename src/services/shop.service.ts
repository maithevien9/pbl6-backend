import httpStatus from 'http-status';
import { IShop, Shop, IUser } from '../models';
import APIError from '../utils/APIError';

interface ICreateShopParams {
  user: IUser;
  body: Pick<IShop, 'name' | 'avatar' | 'address'>;
}

interface IUpdateShopParams {
  orderId: string;
  body: Pick<IShop, 'name' | 'avatar' | 'address'>;
}

interface IGetShopParams {
  pagination: Express.Pagination;
}

class ShopService {
  static create = async ({ body, user }: ICreateShopParams): Promise<IShop> => {
    return Shop.create({ ...body, user: user._id });
  };

  static update = async ({
    body,
    orderId,
  }: IUpdateShopParams): Promise<IShop> => {
    const shop = await Shop.findById(orderId);

    if (!shop) {
      throw new APIError({
        message: 'Shop not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    const orderUpdated = await Shop.findByIdAndUpdate(orderId, body, {
      new: true,
    });

    if (!orderUpdated) {
      throw new APIError({
        message: 'Can not update order',
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }

    return orderUpdated;
  };

  static getAll = async ({ pagination }: IGetShopParams): Promise<IShop[]> => {
    const { limit, skip } = pagination;

    return Shop.find()
      .populate('user')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .lean();
  };
}

export default ShopService;
