import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MyBaseEntity } from './myBase.entity';

@Entity()
export class TestAccounts extends MyBaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'AccountId',
  })
  accountId!: number;

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
  startDate!: Date;
}
