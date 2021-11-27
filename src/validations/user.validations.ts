import Joi from 'joi';
import { GENDER } from '../models';

export const changePasswordSchema = {
  body: Joi.object({
    password: Joi.string().min(6).max(30).required(),
    oldPassword: Joi.string().min(6).max(30).required(),
  }),
};

export const updateInformationSchema = {
  body: Joi.object({
    gender: Joi.string().valid(GENDER.FEMALE, GENDER.MALE).optional(),
    fullName: Joi.string().optional(),
    role: Joi.string().optional(),
    address: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    avatar: Joi.string().optional(),
  }),
};
