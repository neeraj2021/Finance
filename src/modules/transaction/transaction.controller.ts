import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user.decorator';
import { TransactionService } from './transaction.service';

@UseGuards(AuthGuard)
@Controller('api/v1/transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('/create')
  async newTransaction(@Body() account: any, @User() user: any) {
    return await this.transactionService.createTransaction(account, user);
  }
}
