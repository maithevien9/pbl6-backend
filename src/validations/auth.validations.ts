import Joi from 'joi';

export const registerSchema = {
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(50).required(),
    fullName: Joi.string().min(2).max(50).required(),
  }),
};
