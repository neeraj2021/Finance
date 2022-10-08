import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestTransactions } from 'src/db/entities/test_transaction.entity';
import { CreateTransactionDTO } from 'src/dto/transaction/CreateTransactionDTO.dto';
import { IUser } from 'src/types/user.type';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TestTransactions)
    private testTransactionsRepository: Repository<TestTransactions>,
  ) {}

  async allTransactions(user: IUser) {
    return await this.testTransactionsRepository.find({
      where: {
        userId: user.userId,
      },
    });
  }

  async createTransaction(
    transaction: CreateTransactionDTO,
    user: IUser,
  ): Promise<string> {
    const requestId = uuidV4();
    const data = { ...transaction, ...user, requestId };
    await this.testTransactionsRepository.save(data);
    return 'Transaction Added';
  }
}
