import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { DeleteExpenseDto } from './dto/delete-expense.dto';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';

@Controller('expense')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  createExpense(
    @GetUser() user: User,
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<Expense> {
    return this.expenseService.createExpense(createExpenseDto, user);
  }

  @Get()
  getExpenses(@GetUser() user: User) {
    return this.expenseService.getExpenses(user);
  }

  @Delete('/:id')
  deleteExpenseById(
    @Param() deleteExpenseDto: DeleteExpenseDto,
  ): Promise<void> {
    return this.expenseService.deleteExpenseById(deleteExpenseDto);
  }
}
