import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestAccounts } from 'src/db/entities/test_accounts.entity';
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

    @InjectRepository(TestAccounts)
    private testAccountRepository: Repository<TestAccounts>,
  ) {}

  async allTransactions({
    user,
  }: {
    user: IUser;
  }): Promise<TestTransactions[]> {
    return await this.testTransactionsRepository.find({
      where: {
        userId: user.userId,
      },
    });
  }

  async createTransaction({
    transaction,
    user,
  }: {
    transaction: CreateTransactionDTO;
    user: IUser;
  }): Promise<string> {
    const requestId = uuidV4();
    const data = { ...transaction, ...user, requestId };

    const { amount, accountId, type } = data;

    await this.updateCurrentAmount({ amount, accountId, type });
    await this.testTransactionsRepository.save(data);
    return 'Transaction Added';
  }

  async updateCurrentAmount({
    amount,
    accountId,
    type,
  }: {
    amount: number;
    accountId: number;
    type: string;
  }): Promise<void> {
    amount = Number(amount);
    accountId = Number(accountId);
    const account: TestAccounts = await this.testAccountRepository.findOneBy({
      accountId: accountId,
    });

    const updatedAmount =
      type == 'Credit'
        ? account.currentAmount + Number(amount)
        : account.currentAmount - Number(amount);
    await this.testAccountRepository.update(
      { accountId: accountId },
      { currentAmount: updatedAmount },
    );
  }
}
