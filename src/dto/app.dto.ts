import { IsString, IsEmail, MinLength } from 'class-validator';

export class AnswerDTO {
  @IsString()
  name: string;
}

export class RegisterUserDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
