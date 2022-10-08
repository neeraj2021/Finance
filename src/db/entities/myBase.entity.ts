import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class MyBaseEntity {
  @Column({
    nullable: false,
    type: 'varchar',
    name: 'RequestId',
  })
  requestId!: string;

  @CreateDateColumn({
    type: 'datetime',
    default: (): string => 'CURRENT_TIMESTAMP(6)',
    name: 'CreatedAt',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'UpdatedAt',
    type: 'datetime',
    default: (): string => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  updatedAt!: Date;

  @Column({
    nullable: false,
    name: 'UserId',
  })
  userId: string;
}
