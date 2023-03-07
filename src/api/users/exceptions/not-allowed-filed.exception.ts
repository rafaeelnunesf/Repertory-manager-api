import { HttpException, HttpStatus } from '@nestjs/common';
export class NotAllowedException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(
      message || 'Not allowed field',
      status || HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
