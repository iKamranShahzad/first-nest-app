import { IsString } from 'class-validator';

export class SayNameDTO {
  @IsString()
  name: string;
}
