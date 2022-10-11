import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { MyBaseEntity } from './myBase.entity';
import { TestTransactions } from './test_transaction.entity';

@Entity()
export class TestAccounts extends MyBaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'AccountId',
  })
  accountId: number;

  @Column({
    nullable: false,
    name: 'UserName',
  })
  userName: string;

  @Column({
    nullable: false,
    name: 'AccountName',
  })
  accountName: string;

  @Column({
    nullable: false,
    default: 0,
    name: 'InitialAmount',
  })
  initialAmount: number;

  @Column({
    nullable: false,
    default: 0,
    name: 'CurrentAmount',
  })
  currentAmount: number;

  @CreateDateColumn({
    type: 'datetime',
    default: (): string => 'CURRENT_TIMESTAMP(6)',
    name: 'StartDate',
  })
  startDate: Date;

  @OneToMany(() => TestTransactions, (transaction) => transaction.accountId)
  transaction: TestTransactions[];
}
