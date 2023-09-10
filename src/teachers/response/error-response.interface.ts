import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorResponse extends HttpException {
  constructor(message: string) {
    super(
      {
        status_code: HttpStatus.BAD_REQUEST,
        message: message,
        data: null,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
