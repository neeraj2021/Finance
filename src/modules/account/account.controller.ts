import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('api/v1/account')
export class AccountController {
  constructor(private readonly accountServices: AccountService) {}

  @Post('/create')
  async newAccount(@Body() account: any) {
    console.log('Account = ', account);
    // return await this.accountServices.createAccount(account);
  }
}
