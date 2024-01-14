import { IsNotEmpty } from 'class-validator';

export class AccountCreateDto {
  @IsNotEmpty()
  account_number: string;

  @IsNotEmpty()
  total_balance: number;

  @IsNotEmpty()
  account_type: string;

  @IsNotEmpty()
  owners: string[];
}