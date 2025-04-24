import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnswerDTO {
  @ApiProperty()
  @IsString()
  name: string;
}
