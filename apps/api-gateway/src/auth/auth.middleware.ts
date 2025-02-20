import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly JWT_SECRET = process.env.JWT_SECRET;
  
  use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      req.user = decoded; // Attach user info to request
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
