import { IsNotEmpty } from 'class-validator';

export class CreateAccountDTO {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  accountName: string;

  @IsNotEmpty()
  initialAmount: number;

  @IsNotEmpty()
  startDate: Date;
}
