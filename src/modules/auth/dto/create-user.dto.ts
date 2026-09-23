import * as Joi from 'joi';

export class CreateUserDto {
  email!: string;
  password!: string;
  confirmPassword!: string;
}

export const createUserSchema = Joi.object<CreateUserDto>({
  email: Joi.string().email().required().messages({
    'string.email': 'Incorrect email address',
    'string.reqired': 'Email is required',
  }),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*])'))
    .messages({
      'string.base': 'Password must be a text string',
      'string.empty': `Password can't be empty`,
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base':
        'Password must contain at least one letter, one number, and one special character',
      'any.required': 'Password is required',
    }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password must match the password field',
    'any.required': 'Confirm password is a required field',
  }),
});
