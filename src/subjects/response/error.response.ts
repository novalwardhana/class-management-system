import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorResponse extends HttpException {
  constructor(status_code: number, message: string) {
    super(
      {
        status_code: status_code,
        message: message,
        data: null,
      },
      status_code,
    );
  }
}
