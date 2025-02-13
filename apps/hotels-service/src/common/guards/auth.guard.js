"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const axios_1 = require("axios");
let AuthGuard = class AuthGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        // 🔥 **Fix: Ensure `request.headers` exists before accessing `authorization`**
        if (!request.headers || !request.headers.authorization) {
            throw new common_1.UnauthorizedException('Missing Authorization Header');
        }
        const token = request.headers.authorization.split(' ')[1];
        if (!token)
            throw new common_1.UnauthorizedException('No token provided');
        try {
            // 1️⃣ **Local JWT Verification (Fastest)**
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            request.user = decoded;
            return true;
        }
        catch (error) {
            // 2️⃣ **Remote Validation via Auth Service (Fallback)**
            try {
                const response = await axios_1.default.post(`${process.env.AUTH_SERVICE_URL}/auth/validate-token`, { token });
                if (!response.data.isValid)
                    throw new common_1.UnauthorizedException('Invalid token');
                request.user = { id: response.data.userId, role: response.data.role };
                return true;
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map