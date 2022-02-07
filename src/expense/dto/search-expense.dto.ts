import { IsOptional, IsString } from 'class-validator';

export class SearchExpenseDto {
  @IsString()
  @IsOptional()
  description?: string;
}
