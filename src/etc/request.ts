import { HttpStatus, HttpException } from '@nestjs/common';

export class InvalidRequestException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        name: 'InvalidRequestException',
        message: message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
