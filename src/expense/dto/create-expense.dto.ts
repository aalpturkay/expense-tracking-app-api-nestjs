import { IsEnum, IsString } from 'class-validator';
import { ExpenseCategory } from '../expense-category.enum';

export class CreateExpenseDto {
  @IsString()
  description: string;

  @IsString()
  paid: string;

  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;
}
