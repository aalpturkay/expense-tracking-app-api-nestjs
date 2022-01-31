import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ExpenseCategory } from './expense-category.enum';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  paid: string;

  @Column()
  category: ExpenseCategory;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => User, (user) => user.expenses, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
