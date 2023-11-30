import { IsNotEmpty } from 'class-validator';

export class AuthRegisterDto {
  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;
}