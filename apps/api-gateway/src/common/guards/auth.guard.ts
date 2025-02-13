import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // 🔥 **Fix: Ensure `request.headers` exists before accessing `authorization`**
    if (!request.headers || !request.headers.authorization) {
      throw new UnauthorizedException('Missing Authorization Header');
    }

    const token = request.headers.authorization.split(' ')[1];

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      // 1️⃣ **Local JWT Verification (Fastest)**
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded;
      return true;
    } catch (error) {
      // 2️⃣ **Remote Validation via Auth Service (Fallback)**
      try {
        const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/auth/validate-token`, { token });
        if (!response.data.isValid) throw new UnauthorizedException('Invalid token');
        request.user = { id: response.data.userId, role: response.data.role };
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
}
