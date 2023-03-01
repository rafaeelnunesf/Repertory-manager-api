import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor(message?: string) {
    super(
      message || 'Email or password provided is not valid',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
