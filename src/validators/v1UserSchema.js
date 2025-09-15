import Joi from 'joi';

export const v1UserSchema = Joi.object({
  id: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'id (email) is required',
    'string.email': 'id must be a valid email'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'password is required',
    'string.min': 'password must be at least 6 characters long'
  })
});
