import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req, res, next) {
    console.log('middleware working');
    next();
  }
}
