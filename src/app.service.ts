import { Injectable } from '@nestjs/common';

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
}
