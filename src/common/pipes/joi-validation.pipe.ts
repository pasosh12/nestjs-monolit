import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: joi.ObjectSchema) {}

  transform(value: any): any {
    const { error, value: validatedValue } = this.schema.validate(value, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) {
      const errorMessages = error.details.map((d) => d.message);
      throw new BadRequestException({
        statusCode: 400,
        message: 'Authorization Error',
        error: errorMessages,
      });
    }
    return validatedValue;
  }
}
