import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [AuthModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
