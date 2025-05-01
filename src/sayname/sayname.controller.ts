import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { VerifiedUserGuard } from '../auth/verified-user.guard';

import { AuthGuard } from '@nestjs/passport';
import { SayNameDTO } from 'src/dto/sayName.dto';
import { SaynameService } from './sayname.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), VerifiedUserGuard)
@Controller('sayname')
export class SaynameController {
  constructor(private readonly nameService: SaynameService) {}

  @Post()
  sayName(@Body() body: SayNameDTO): string {
    return this.nameService.sayName(body.name);
  }
}
