import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAccountDTO } from 'src/dto/account/CreateAccountDTO.dto';
import { User } from 'src/user.decorator';
import { AccountService } from './account.service';
import { IUser } from 'src/types/user.type';

@UseGuards(AuthGuard)
@Controller('api/v1/account')
export class AccountController {
  constructor(private readonly accountServices: AccountService) {}

  @Get('/')
  async accountList(@User() user: IUser) {
    return await this.accountServices.accountList({ user });
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  async newAccount(@Body() account: CreateAccountDTO, @User() user: IUser) {
    return await this.accountServices.createAccount({ body: account, user });
  }
}
