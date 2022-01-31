import { IsUUID } from 'class-validator';

export class DeleteExpenseDto {
  @IsUUID()
  id: string;
}
