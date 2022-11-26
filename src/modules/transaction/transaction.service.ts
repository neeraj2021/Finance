import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'src/db/entities/accounts.entity';
import { Transactions } from 'src/db/entities/transaction.entity';
import { CreateTransactionDTO } from 'src/dto/transaction/CreateTransactionDTO.dto';
import { IUser } from 'src/types/user.type';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { TransactionTypes } from 'src/constants/TransactionTypes';

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
      .addSelect(['a.accountName', 'a.accountId'])
      .where('t.userId = :id', {
        id: user.userId,
      })
      .andWhere('t.IsDeleted = false')
      .orderBy('t.transactionDate', 'DESC')
      .getMany();

    const allTransactions = data.map((transaction) => {
      const obj = {
        ...transaction,
        accountName: transaction?.accountDetail?.accountName,
        accountId: transaction?.accountDetail?.accountId,
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
      .andWhere('t.IsDeleted = false')
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

  private async updateCurrentAmount({
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
      type == TransactionTypes.CREDIT
        ? Number(account.currentAmount) + Number(amount)
        : Number(account.currentAmount) - Number(amount);
    await this.testAccountRepository.update(
      { accountId: accountId },
      { currentAmount: updatedAmount },
    );
  }

  async deleteTransaction(id: number): Promise<string> {
    const transaction: Transactions =
      await this.testTransactionsRepository.findOneBy({
        transactionId: id,
      });
    if (transaction.IsDeleted) {
      throw Error(`Transaction with id ${id} is already deleted`);
    }
    transaction.IsDeleted = true;
    await this.testTransactionsRepository
      .createQueryBuilder()
      .update(Transactions)
      .set({
        IsDeleted: true,
      })
      .where('TransactionId = :id', { id: id })
      .execute();
    const type =
      transaction.type == TransactionTypes.CREDIT
        ? TransactionTypes.DEBIT
        : TransactionTypes.CREDIT;
    await this.updateCurrentAmount({
      amount: transaction.amount,
      accountId: transaction.accountId,
      type,
    });
    return `Transaction with id ${id} is deleted`;
  }

  async updateTransaction(
    id: number,
    body: CreateTransactionDTO,
  ): Promise<string> {
    const transaction: Transactions =
      await this.testTransactionsRepository.findOneBy({
        transactionId: id,
      });
    const oldAmount = transaction.amount;
    const newAmount = body.amount;

    transaction.IsDeleted = true;
    await this.testTransactionsRepository
      .createQueryBuilder()
      .update(Transactions)
      .set({
        amount: newAmount,
      })
      .where('TransactionId = :id', { id: id })
      .execute();

    const diff = newAmount - oldAmount;

    await this.updateCurrentAmount({
      amount: diff,
      accountId: transaction.accountId,
      type: transaction.type,
    });

    return 'Transaction Updated Sucessfully';
  }
}
