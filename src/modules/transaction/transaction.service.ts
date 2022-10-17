import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'src/db/entities/accounts.entity';
import { Transactions } from 'src/db/entities/transaction.entity';
import { CreateTransactionDTO } from 'src/dto/transaction/CreateTransactionDTO.dto';
import { IUser } from 'src/types/user.type';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transactions)
    private testTransactionsRepository: Repository<Transactions>,

    @InjectRepository(Accounts)
    private testAccountRepository: Repository<Accounts>,
  ) {}

  async allTransactions({ user }: { user: IUser }): Promise<Transactions[]> {
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
      .orderBy('t.transactionDate', 'DESC')
      .getMany();

    const allTransactions = data.map((transaction) => {
      const obj = {
        ...transaction,
        accountName: transaction?.accountDetail?.accountName,
      };
      delete obj.accountDetail;
      return obj;
    });
    return allTransactions;
  }

  async recentTransaction(user: IUser, accountId: number) {
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
      .where('t.userId=:id and t.accountId=:accountId', {
        id: user.userId,
        accountId: accountId,
      })
      .orderBy('t.transactionDate', 'DESC')
      .limit(10)
      .getMany();

    const recentTransactions = data.map((transaction) => {
      const obj = {
        ...transaction,
        accountName: transaction?.accountDetail?.accountName,
      };
      delete obj.accountDetail;
      return obj;
    });
    return recentTransactions;
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
    const account: Accounts = await this.testAccountRepository.findOneBy({
      accountId: accountId,
    });

    const updatedAmount =
      type == 'Credit'
        ? Number(account.currentAmount) + Number(amount)
        : Number(account.currentAmount) - Number(amount);
    await this.testAccountRepository.update(
      { accountId: accountId },
      { currentAmount: updatedAmount },
    );
  }
}
