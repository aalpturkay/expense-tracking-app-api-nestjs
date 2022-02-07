import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.entity';
import { UserService } from 'src/auth/user.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { DeleteExpenseDto } from './dto/delete-expense.dto';
import { SearchExpenseDto } from './dto/search-expense.dto';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';

@Controller('expense')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly userService: UserService,
  ) {}

  @Post()
  createExpense(
    @GetUser() user: User,
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<Expense> {
    return this.expenseService.createExpense(createExpenseDto, user);
  }

  @Get()
  getExpenses(
    @GetUser() user: User,
    @Query() searchExpenseDto: SearchExpenseDto,
  ) {
    return this.expenseService.getExpenses(user, searchExpenseDto);
  }

  @Get('/balance')
  async getBalance(@GetUser() user: User) {
    return await this.userService.getBalance(user);
  }

  @Delete('/:id')
  deleteExpenseById(
    @GetUser() user: User,
    @Param() deleteExpenseDto: DeleteExpenseDto,
  ): Promise<void> {
    return this.expenseService.deleteExpenseById(user, deleteExpenseDto);
  }
}
