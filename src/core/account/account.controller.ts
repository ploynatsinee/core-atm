import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AccountService } from "../account/account.services";
import { AccountCreateDto } from "../account/account.dto";

@Controller('account')
export class AccountController {
  constructor(protected service: AccountService) { }

  @Post('create')
  async createAccount(@Body() data: AccountCreateDto) {
    return await this.service.createAccount(data)
  }

  @Get('/:account_number')
  async getAccountByAccountNumber(@Param() account_number: object) {
    return await this.service.getAccountByAccountNumber(account_number)
  }
}