import { Injectable } from '@nestjs/common';
import { redis } from './database/redis.provider';

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
  async setRedisString(key: string, value: string): Promise<string> {
    await redis.set(key, value);
    return `Set ${key} = ${value}`;
  }

  async getRedisString(key: string): Promise<string | null> {
    return await redis.get(key);
  }
}
