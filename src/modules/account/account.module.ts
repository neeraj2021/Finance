import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Accounts } from 'src/db/entities/accounts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts])],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
