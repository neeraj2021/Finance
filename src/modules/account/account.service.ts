import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'src/db/entities/accounts.entity';
import { CreateAccountDTO } from 'src/dto/account/CreateAccountDTO.dto';
import { IUser } from 'src/types/user.type';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { AccountList } from 'src/types/account.type';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Accounts)
    private testAccountRepository: Repository<Accounts>,
  ) {}

  async accountList({ user }: { user: IUser }): Promise<AccountList[]> {
    return await this.testAccountRepository.find({
      select: {
        userName: true,
        accountId: true,
        accountName: true,
        currentAmount: true,
        initialAmount: true,
      },
      where: {
        userId: user.userId,
      },
    });
  }

  async createAccount({
    body,
    user,
  }: {
    body: CreateAccountDTO;
    user: IUser;
  }): Promise<string> {
    const requestId = uuidV4();
    const currentAmount = body.initialAmount;
    const data = { ...body, ...user, requestId, currentAmount };
    await this.testAccountRepository.save(data);
    return 'Account Created !!';
  }
}
