import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesRepository } from './expenses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesRepository])],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
