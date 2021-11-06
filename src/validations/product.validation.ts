import Joi from 'joi';

export const createProductSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    avatar: Joi.string().required(),
    photos: Joi.array().items(Joi.string()).optional(),
    shop: Joi.string().required(),
  }),
};

export const updateProductSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    category: Joi.string().optional(),
    avatar: Joi.string().optional(),
    photos: Joi.array().items(Joi.string()).optional(),
    shop: Joi.string().optional(),
  }),
};

export const getProductsSchema = {
  query: Joi.object({
    limit: Joi.number().optional(),
    page: Joi.number().optional(),
  }),
};

export const getByShopSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
