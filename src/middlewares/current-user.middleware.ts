import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (token) {
      const payload = this.jwtService.verify(token, {
        secret: 'my-secret-key',
      });
      const user = await this.usersService.findOne(payload.id);
      req.user = user;
      next();
    } else {
      next();
    }
  }
}
