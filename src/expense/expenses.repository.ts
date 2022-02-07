import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { UsersRepository } from 'src/auth/users.repository';
import { Repository, EntityRepository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { DeleteExpenseDto } from './dto/delete-expense.dto';
import { SearchExpenseDto } from './dto/search-expense.dto';
import { ExpenseCategory } from './expense-category.enum';
import { Expense } from './expense.entity';

@EntityRepository(Expense)
export class ExpensesRepository extends Repository<Expense> {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {
    super();
  }
  async createExpense(
    createExpenseDto: CreateExpenseDto,
    user: User,
  ): Promise<Expense> {
    const { description, paid, category } = createExpenseDto;
    user.total +=
      category === ExpenseCategory.Income
        ? Number.parseFloat(paid)
        : -Number.parseFloat(paid);

    await this.usersRepository.save(user);
    console.log(user);
    // this.usersRepository.update(user, { total: Number.parseFloat(paid) });

    const expense = this.create({
      description,
      paid,
      category,
      user,
    });
    return await this.save(expense);
  }

  async getExpenses(
    user: User,
    searchExpenseDto: SearchExpenseDto,
  ): Promise<Expense[]> {
    // console.log(`total: ${user.total}`);
    // const expenses = await this.find({ user });
    // return expenses;
    const { description } = searchExpenseDto;
    const query = this.createQueryBuilder('expense');
    query.where({ user });
    if (description) {
      query.andWhere('expense.description ILIKE :description', {
        description: `%${description}%`,
      });
    }

    const expenses = await query.getMany();
    return expenses;
  }

  async deleteExpenseById(
    user: User,
    deleteExpenseDto: DeleteExpenseDto,
  ): Promise<void> {
    const { id } = deleteExpenseDto;
    const foundExpense = await this.findOne({ id });
    const foundExpensePaid = foundExpense.paid;
    const foundExpenseCategory = foundExpense.category;

    if (foundExpense) {
      user.total +=
        foundExpenseCategory == ExpenseCategory.Income
          ? -Number.parseFloat(foundExpensePaid)
          : Number.parseFloat(foundExpensePaid);

      await this.usersRepository.save(user);
    }

    const affected = (await this.delete(id)).affected;

    if (affected === 0) {
      throw new NotFoundException(`There is no item for this id: ${id}`);
    }
  }
}
