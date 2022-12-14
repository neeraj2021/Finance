import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { IUser } from 'src/types/user.type';
import { User } from 'src/user.decorator';
import { TransactionService } from './transaction.service';
import { CreateTransactionDTO } from '../../dto/transaction/CreateTransactionDTO.dto';

@UseGuards(AuthGuard)
@Controller('api/v1/transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('/')
  async allTransaction(@User() user: IUser) {
    return this.transactionService.allTransactions({ user });
  }

  @Get('/recent-transaction/:accountId')
  async recentTransaction(
    @User() user: IUser,
    @Param('accountId') accountId: number,
  ) {
    return this.transactionService.recentTransaction(user, accountId);
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  async newTransaction(
    @Body() transaction: CreateTransactionDTO,
    @User() user: IUser,
  ) {
    return await this.transactionService.createTransaction({
      transaction,
      user,
    });
  }

  @Delete('delete/:id')
  async deleteTransaction(@Param('id') id: number) {
    return await this.transactionService.deleteTransaction(id);
  }

  @Post('update/:id')
  async updateTransaction(
    @Param('id') id: number,
    @Body() transaction: CreateTransactionDTO,
  ) {
    return this.transactionService.updateTransaction(id, transaction);
  }
}
