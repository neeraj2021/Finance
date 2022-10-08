import { TypeOrmModule } from '@nestjs/typeorm';
import { TestAccounts } from './entities/test_accounts.entity';
import { TestTransactions } from './entities/test_transaction.entity';

export const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Neeraj@123',
  database: 'sql_hr',
  entities: [TestAccounts, TestTransactions],
  synchronize: false,
});
