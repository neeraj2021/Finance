import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MyBaseEntity } from './myBase.entity';

@Entity()
export class TestAccounts extends MyBaseEntity {
  @Column({
    nullable: true,
    name: 'UserName',
  })
  userName: string;

  @Column({
    nullable: true,
    name: 'UserId',
  })
  userId: string;

  @Column({
    nullable: true,
    name: 'EmailId',
  })
  emailId: string;

  @Column({
    nullable: true,
    name: 'AccountName',
  })
  accountName: string;

  // @PrimaryGeneratedColumn({
  //   name: 'AccountId',
  // })
  // accountId: number;

  @Column({
    default: 0,
    name: 'InitialAmount',
  })
  initialAmount: number;

  @Column({
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
