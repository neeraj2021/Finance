/*
 * Copyright (c) 2022. FieldAssist
 * All rights reserved.
 */

import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class MyBaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'Id' })
  id!: number;

  @PrimaryGeneratedColumn('uuid', { name: 'RequestId' })
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
}
