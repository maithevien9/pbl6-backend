import Joi from 'joi';

export const createShopSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    avatar: Joi.string().required(),
    address: Joi.string().required(),
  }),
};

export const updateShopSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
    avatar: Joi.string().required(),
    address: Joi.string().required(),
  }),
};

export const deleteShopSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

export const getShopsSchema = {
  query: Joi.object({
    limit: Joi.number().optional(),
    page: Joi.number().optional(),
  }),
};
