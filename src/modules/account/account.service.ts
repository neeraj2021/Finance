import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestAccounts } from 'src/db/entities/test_accounts.entity';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(TestAccounts)
    private testAccountRepository: Repository<TestAccounts>,
  ) {}

  async accountList(user): Promise<any> {
    return this.testAccountRepository.findBy({
      userId: user.userId,
    });
  }

  async createAccount(body: any, user: any): Promise<string> {
    const requestId = uuidV4();
    const currentAmount = body.initialAmount;
    const data = { ...body, ...user, requestId, currentAmount };
    await this.testAccountRepository.save(data);
    return 'Account Created !!';
  }
}
