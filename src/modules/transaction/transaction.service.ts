import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestTransactions } from 'src/db/entities/test_transaction.entity';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TestTransactions)
    private testTransactionsRepository: Repository<TestTransactions>,
  ) {}

  async createTransaction(body, user): Promise<string> {
    const requestId = uuidV4();
    const data = { ...body, ...user, requestId };
    await this.testTransactionsRepository.save(data);
    return 'Transaction Added';
  }
}
