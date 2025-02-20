import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.entity';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  // ✅ Register a new user
  async register(username: string, password: string) {
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword });
    await newUser.save();

    return { message: 'User registered successfully' };
  }

  // ✅ Authenticate user (Login)
  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // 🔹 Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 🔹 Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      this.jwtSecret,
      { expiresIn: '1h' },
    );

    return { accessToken: token };
  }

  // ✅ Validate JWT Token
  async validateToken(token: string) {
    try {
      console.log('validating token');
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
