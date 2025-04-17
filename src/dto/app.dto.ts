import { IsString } from 'class-validator';

export class AnswerDTO {
  @IsString()
  name: string;
}
