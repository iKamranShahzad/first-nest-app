import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return { message: 'Welcome to my first NestJS App.' };
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
}
