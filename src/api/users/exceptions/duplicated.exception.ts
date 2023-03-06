import { HttpException, HttpStatus } from '@nestjs/common';
export class DuplicateException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(
      message || 'Forbidden to register duplicate data',
      status || HttpStatus.CONFLICT,
    );
  }
}
