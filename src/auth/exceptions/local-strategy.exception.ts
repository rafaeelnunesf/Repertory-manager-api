import { HttpException, HttpStatus } from '@nestjs/common';

export class LocalStrategyException extends HttpException {
  constructor(message?: string) {
    super(message || 'error on local strategy', HttpStatus.UNAUTHORIZED);
  }
}
