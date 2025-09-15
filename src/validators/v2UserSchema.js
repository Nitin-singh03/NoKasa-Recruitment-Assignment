import Joi from 'joi';

export const v2UserSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
    'string.empty': 'id (phone) is required',
    'string.pattern.base': 'id must be a numeric phone number (10-15 digits)'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'password is required',
    'string.min': 'password must be at least 6 characters long'
  })
});
