import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AnswerDTO } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/askquestion')
  askQuestion(): string {
    return this.appService.askQuestion();
  }

  @Post('/answer')
  answer(@Body() answerDTO: AnswerDTO): string {
    return this.appService.getAnswer(answerDTO.name);
  }
}
