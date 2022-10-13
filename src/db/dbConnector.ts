import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './entities/accounts.entity';
import { Transactions } from './entities/transaction.entity';
import * as dotenv from 'dotenv';

dotenv.config();
const DB_PORT = Number(process.env.DB_PORT);

export const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.HOST,
  port: DB_PORT,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [Accounts, Transactions],
  synchronize: false,
  logging: false,
});
