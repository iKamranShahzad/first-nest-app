import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/app.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is my first NestJS backend project.';
  }
  askQuestion(): string {
    return 'What is your name?';
  }
  getAnswer(name: string): string {
    return `Hello, ${name}!`;
  }
  getRouteParams(userId: number): string {
    return 'This is the user id: ' + userId;
  }
  getQueryStrings(userName: string, age: number): string {
    return (
      'This is the user name and age (Using Query Strings): ' +
      userName +
      ', ' +
      age
    );
  }
  registerUser(dto: RegisterUserDto): {
    message: string;
    user: RegisterUserDto;
  } {
    return {
      message: 'User registered successfully',
      user: dto,
    };
  }
}
