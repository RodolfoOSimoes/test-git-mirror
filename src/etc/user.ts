import { HttpStatus, HttpException } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        name: 'UserNotFoundException',
        message: message,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class ExternalUser {
  uid: string;
  name: string;
  email: string;
  avatar: string;
}
