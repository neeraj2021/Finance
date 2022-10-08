import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDTO {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  accountId: number;

  @IsNotEmpty()
  transactionDate: string;

  @IsNotEmpty()
  description: string;
}
