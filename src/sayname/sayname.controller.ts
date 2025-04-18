import { Body, Controller, Post } from '@nestjs/common';
import { SayNameDTO } from 'src/dto/sayName.dto';
import { SaynameService } from './sayname.service';

@Controller('sayname')
export class SaynameController {
  constructor(private readonly nameService: SaynameService) {}

  @Post()
  sayName(@Body() body: SayNameDTO): string {
    return this.nameService.sayName(body.name);
  }
}
