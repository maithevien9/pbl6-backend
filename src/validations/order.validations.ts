import Joi from 'joi';

export const createOrderSchema = {
  body: Joi.object({
    totalPrice: Joi.number().required(),
    deliveryAddress: Joi.string().required(),
    product: Joi.array().items(Joi.string()).required(),
    status: Joi.string().required(),
  }),
};

export const updateOrderSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    totalPrice: Joi.number().optional(),
    deliveryAddress: Joi.string().optional(),
    product: Joi.array().items(Joi.string()).optional(),
    status: Joi.string().optional(),
  }),
};

export const getOrdersSchema = {
  query: Joi.object({
    limit: Joi.number().optional(),
    page: Joi.number().optional(),
  }),
};

export const getByUserSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  query: Joi.object({
    limit: Joi.number().optional(),
    page: Joi.number().optional(),
  }),
};
