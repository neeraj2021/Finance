import { TypeOrmModule } from '@nestjs/typeorm';
import { TestAccounts } from './entities/test_accounts.entity';
import { TestTransactions } from './entities/test_transaction.entity';
import * as dotenv from 'dotenv';

dotenv.config();
const PORT = Number(process.env.PORT);

export const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.HOST,
  port: PORT,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [TestAccounts, TestTransactions],
  synchronize: false,
  logging: false,
});
