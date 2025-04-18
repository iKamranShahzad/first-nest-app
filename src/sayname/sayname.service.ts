import { Injectable } from '@nestjs/common';

@Injectable()
export class SaynameService {
  sayName(name: string): string {
    return `Hello, ${name}!`;
  }
}
