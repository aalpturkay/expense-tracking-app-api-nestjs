import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { DeleteExpenseDto } from './dto/delete-expense.dto';
import { Expense } from './expense.entity';
import { ExpensesRepository } from './expenses.repository';
@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpensesRepository)
    private readonly expensesRepository: ExpensesRepository,
  ) {}

  createExpense(
    createExpenseDto: CreateExpenseDto,
    user: User,
  ): Promise<Expense> {
    return this.expensesRepository.createExpense(createExpenseDto, user);
  }

  getExpenses(user: User) {
    return this.expensesRepository.getExpenses(user);
  }

  deleteExpenseById(deleteExpenseDto: DeleteExpenseDto): Promise<void> {
    return this.expensesRepository.deleteExpenseById(deleteExpenseDto);
  }
}
