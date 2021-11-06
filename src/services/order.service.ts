import httpStatus from 'http-status';
import { IOrder, Order, IUser } from '../models';
import APIError from '../utils/APIError';

interface ICreateOrderParams {
  user: IUser;
  body: Omit<IOrder, 'createdAt' | 'updatedAt'>;
}

interface IUpdateOrderParams {
  orderId: string;
  body: Omit<IOrder, 'createdAt' | 'updatedAt'>;
}

interface IGetOrderParams {
  pagination: Express.Pagination;
}

interface IGetOrderByUserParams {
  user: IUser;
  pagination: Express.Pagination;
}
class OrderService {
  static create = async ({
    user,
    body,
  }: ICreateOrderParams): Promise<IOrder> => {
    return Order.create({ ...body, user: user._id });
  };

  static update = async ({
    body,
    orderId,
  }: IUpdateOrderParams): Promise<IOrder> => {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new APIError({
        message: 'Order not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    const productUpdated = await Order.findByIdAndUpdate(orderId, body, {
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

  static getAll = async ({
    pagination,
  }: IGetOrderParams): Promise<IOrder[]> => {
    const { limit, skip } = pagination;
    return Order.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate([
        {
          path: 'product',
          select: 'name price category avatar photos',
          populate: [
            {
              path: 'category',
              select: 'name',
            },
          ],
        },
      ])
      .lean();
  };

  static getByUser = async ({
    user,
    pagination,
  }: IGetOrderByUserParams): Promise<IOrder[]> => {
    const { limit, skip } = pagination;
    return Order.find({ user: user._id })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate([
        {
          path: 'product',
          select: 'name price category avatar photos',
          populate: [
            {
              path: 'category',
              select: 'name',
            },
          ],
        },
      ])
      .lean();
  };
}

export default OrderService;
