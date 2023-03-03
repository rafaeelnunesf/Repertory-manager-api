import { HttpException, HttpStatus } from '@nestjs/common';
export class DuplicateException extends HttpException {
  constructor(
    message?: string | 'Forbidden to register duplicate data',
    status?: HttpStatus | HttpStatus.CONFLICT,
  ) {
    super(message, status);
  }
}
