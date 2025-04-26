import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AnswerDTO } from './dto/app.dto';
import { SumServiceService } from './sum-service/sum-service.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sumService: SumServiceService,
  ) {}

  // Get Handlers
  @Get()
  getHello(): { message: string } {
    return this.appService.getHello();
  }

  @Get('query')
  getQueryStrings(
    @Query('name') userName: string,
    @Query('age', ParseIntPipe) age: number,
  ): string {
    return this.appService.getQueryStrings(userName, age);
  }

  @Get('sum')
  getSum(
    @Query('a', ParseIntPipe) a: number,
    @Query('b', ParseIntPipe) b: number,
  ): { sum: number } {
    return { sum: this.sumService.getSum(a, b) };
  }

  @Get('/askquestion')
  askQuestion(): string {
    return this.appService.askQuestion();
  }

  @Get(':id')
  getRouteParams(@Param('id', ParseIntPipe) userId: number): string {
    return this.appService.getRouteParams(userId);
  }

  // Post Handlers
  @Post('/answer')
  answer(@Body() answerDTO: AnswerDTO): string {
    return this.appService.getAnswer(answerDTO.name);
  }
}
