import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user.decorator';
import { AccountService } from './account.service';

@UseGuards(AuthGuard)
@Controller('api/v1/account')
export class AccountController {
  constructor(private readonly accountServices: AccountService) {}

  @Get('/')
  async accountList(@User() user: any) {
    return await this.accountServices.accountList(user);
  }

  @Post('/create')
  async newAccount(@Body() account: any, @User() user: any) {
    return await this.accountServices.createAccount(account, user);
  }
}
