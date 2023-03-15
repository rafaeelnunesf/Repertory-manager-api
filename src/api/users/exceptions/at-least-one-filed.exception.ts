import { HttpException, HttpStatus } from '@nestjs/common';
export class AtLeastOneFieldException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(
      message || 'Must be informed at least one field to update',
      status || HttpStatus.BAD_REQUEST,
    );
  }
}
