import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MyBaseEntity } from './myBase.entity';
import { Accounts } from './accounts.entity';

@Entity()
export class Transactions extends MyBaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'TransactionId',
  })
  transactionId: number;

  @Column({
    type: 'int',
    name: 'Amount',
  })
  amount: number;

  @Column({
    type: 'varchar',
    name: 'Type',
  })
  type: string;

  @Column({
    type: 'int',
    name: 'AccountId',
  })
  accountId: number;

  @CreateDateColumn({
    type: 'datetime',
    default: (): string => 'CURRENT_TIMESTAMP(6)',
    name: 'TransactionDate',
  })
  transactionDate!: Date;

  @Column({
    type: 'varchar',
    name: 'Description',
    length: 1000,
  })
  description: string;

  @ManyToOne(() => Accounts, (accounts) => accounts.accountId)
  @JoinColumn({
    name: 'AccountDetail',
  })
  accountDetail: Accounts;
}
