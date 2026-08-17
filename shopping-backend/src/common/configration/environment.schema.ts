import * as Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.number().integer().default(4000),
  NODE_ENV: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_TOKEN: Joi.string().required(),
  JWT_EXPIRES: Joi.string().required(),
});
