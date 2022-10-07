import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TestAccounts } from 'src/db/entities/test_accounts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TestAccounts])],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
