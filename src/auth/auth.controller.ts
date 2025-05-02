import { Body, Controller, Post, Get, Res, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterDto,
  LoginDto,
  ResetPasswordDto,
  ResetPasswordRequestDto,
} from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('reset')
  async reset(@Body() dto: ResetPasswordDto) {
    return this.authService.resetAccountPassword(dto);
  }

  @Get('verify')
  async verify(@Query('token') token: string) {
    return this.authService.verifyAccount(token);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set to true if using HTTPS
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    // Don't send access_token in body
    const { access_token, ...rest } = result;
    return rest;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set to true if using HTTPS
    });
    return { message: 'Logged out successfully' };
  }

  @Post('reset-password-request')
  async resetPasswordRequest(@Body() dto: ResetPasswordRequestDto) {
    return this.authService.resetPasswordRequest(dto);
  }
}
