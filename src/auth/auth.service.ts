import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { database, usersCollection } from '../database/arangodb.provider';
import * as argon2 from 'argon2';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { aql } from 'arangojs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async register(dto: RegisterDto) {
    const cursor = await database.query(
      aql`FOR u IN users FILTER u.email == ${dto.email} RETURN u`,
    );
    const existing = (await cursor.next()) as RegisterDto | undefined;
    if (existing) throw new ConflictException('Email already registered');

    const hashed = await argon2.hash(dto.password);
    const user = { email: dto.email, password: hashed };
    await usersCollection.save(user);
    return { message: 'User registered successfully', email: dto.email };
  }

  async login(dto: LoginDto) {
    const cursor = await database.query(
      aql`FOR u IN users FILTER u.email == ${dto.email} RETURN u`,
    );
    const user = (await cursor.next()) as LoginDto | undefined;
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await argon2.verify(user.password, dto.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    // Generate JWT token
    const payload = { email: user.email, sub: user._key };
    const access_token = await this.jwtService.signAsync(payload);
    return { message: 'Login successful', email: dto.email, access_token };
  }
}
