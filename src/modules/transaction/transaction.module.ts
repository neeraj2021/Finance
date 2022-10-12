import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from 'src/db/entities/transaction.entity';
import { Accounts } from 'src/db/entities/accounts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions, Accounts])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
