import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
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
    const data = await this.testTransactionsRepository
      .createQueryBuilder('t')
      .select([
        't.transactionId',
        't.amount',
        't.type',
        't.transactionDate',
        't.description',
      ])
      .leftJoin('t.accountDetail', 'a')
      .addSelect(['a.accountName'])
      .where('t.userId = :id', {
        id: user.userId,
      })
      .getMany();

    // _.merge(transaction, transaction.accountDetail),

    const allTransactions = data.map((transaction) => {
      console.log(transaction.accountDetail.accountName);
      const obj = {
        ...transaction,
        accountName: transaction?.accountDetail?.accountName,
      };
      delete obj.accountDetail;
      return obj;
    });
    return allTransactions;
  }

  async createTransaction({
    transaction,
    user,
  }: {
    transaction: CreateTransactionDTO;
    user: IUser;
  }): Promise<string> {
    const requestId = uuidV4();
    const accountDetail = await this.testAccountRepository.findOneBy({
      accountId: transaction.accountId,
    });
    const data = { ...transaction, ...user, requestId, accountDetail };
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
