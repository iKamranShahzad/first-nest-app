import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { database, usersCollection } from '../database/arangodb.provider';
import * as argon2 from 'argon2';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { aql } from 'arangojs';
import { sendVerificationEmail } from 'src/utils/email';

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
    const verificationToken = randomBytes(32).toString('hex');
    const user = {
      email: dto.email,
      password: hashed,
      isVerified: false,
      verificationToken,
    };
    await usersCollection.save(user);

    await sendVerificationEmail(dto.email, verificationToken);

    return {
      message: 'User registered successfully. Please verify your email.',
      email: dto.email,
    };
  }

  async verifyAccount(token: string) {
    const cursor = await database.query(
      aql`FOR u IN users FILTER u.verificationToken == ${token} RETURN u`,
    );
    const user = await cursor.next();
    if (!user)
      throw new UnauthorizedException('Invalid or expired verification token');
    if (user.isVerified) return { message: 'Account already verified.' };

    await usersCollection.update(user._key, {
      isVerified: true,
      verificationToken: null,
    });
    return { message: 'Account verified successfully.' };
  }

  async login(dto: LoginDto) {
    const cursor = await database.query(
      aql`FOR u IN users FILTER u.email == ${dto.email} RETURN u`,
    );
    const user = (await cursor.next()) as
      | (LoginDto & { isVerified?: boolean })
      | undefined;
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (user.isVerified === false)
      throw new UnauthorizedException('Account not verified');
    const valid = await argon2.verify(user.password, dto.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const payload = { email: user.email, sub: user._key };
    const access_token = await this.jwtService.signAsync(payload);
    return { message: 'Login successful', email: dto.email, access_token };
  }
}
