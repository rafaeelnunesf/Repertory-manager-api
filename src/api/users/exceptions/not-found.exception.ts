import { HttpException, HttpStatus } from '@nestjs/common';
export class NotFoundException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(message || 'Not found', status || HttpStatus.NOT_FOUND);
  }
}
