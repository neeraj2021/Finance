import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestTransactions } from 'src/db/entities/test_transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestTransactions])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
