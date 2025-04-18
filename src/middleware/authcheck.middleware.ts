import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthCheckMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthCheckMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl !== '/favicon.ico') {
      this.logger.log(
        `\n[${req.method}] ${req.originalUrl}\nHeaders:\n${JSON.stringify(req.headers, null, 2)}\n`,
      );

      if (!req.headers.authorization) {
        this.logger.warn('Missing Authorization header');
        // throw new UnauthorizedException(); // Uncomment this line to throw an exception (Exception filter will handle it)
      }
    }
    next();
  }
}
