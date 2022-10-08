import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Get,
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
}
