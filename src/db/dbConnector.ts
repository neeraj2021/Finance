import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './entities/accounts.entity';
import { Transactions } from './entities/transaction.entity';
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
  entities: [Accounts, Transactions],
  synchronize: false,
  logging: false,
});
