import { Expense } from 'src/expense/expense.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 0, type: 'float' })
  total: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => Expense, (expense) => expense.user, { eager: true })
  expenses: Expense[];
}
