import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MyBaseEntity } from './myBase.entity';

@Entity()
export class TestTransactions extends MyBaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
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
}
