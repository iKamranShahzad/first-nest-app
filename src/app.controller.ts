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
import { AnswerDTO, RegisterUserDto } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Get Handlers
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('query')
  getQueryStrings(
    @Query('name') userName: string,
    @Query('age', ParseIntPipe) age: number,
  ): string {
    return this.appService.getQueryStrings(userName, age);
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

  @Post('register')
  registerUser(@Body() registerUserDTO: RegisterUserDto) {
    return this.appService.registerUser(registerUserDTO);
  }
}
