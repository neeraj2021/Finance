import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestAccounts } from 'src/db/entities/test_accounts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(TestAccounts)
    private testAccountRepository: Repository<TestAccounts>,
  ) {}

  async createAccount(body: any): Promise<string> {
    await this.testAccountRepository.save(body);
    return 'Account Created !!';
  }
}
