import { HttpException, HttpStatus } from '@nestjs/common';

export class LocalAuthGuardException extends HttpException {
  constructor(message?: string) {
    super(message || 'error on local auth guard', HttpStatus.UNAUTHORIZED);
  }
}
