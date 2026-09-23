import * as Joi from 'joi';

export class LoginDto {
  email!: string;
  password!: string;
}

export const loginSchema = Joi.object<LoginDto>({
  email: Joi.string().email().required().messages({
    'string.email': 'Incorrect email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).required().messages({
    'any.required': 'Passwords is required',
    'any.min': 'Password minimum length is 8 characters',
  }),
});
