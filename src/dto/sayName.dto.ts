import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SayNameDTO {
  @ApiProperty()
  @IsString()
  name: string;
}
