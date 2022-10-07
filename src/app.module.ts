import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestAccounts } from './db/entities/test_accounts.entity';
import { AccountModule } from './modules/account/account.module';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Neeraj@123',
  database: 'sql_hr',
  entities: [TestAccounts],
  synchronize: true,
});

@Module({
  imports: [typeOrmModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
