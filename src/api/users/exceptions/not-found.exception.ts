import { HttpException, HttpStatus } from '@nestjs/common';
export class NotFoundException extends HttpException {
  constructor(
    message?: string | 'Not found',
    status?: HttpStatus | HttpStatus.NOT_FOUND,
  ) {
    super(message, status);
  }
}
