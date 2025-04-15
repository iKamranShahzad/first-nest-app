import { IsString } from 'class-validator';

export class AnswerDTO {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  name: string;
}
