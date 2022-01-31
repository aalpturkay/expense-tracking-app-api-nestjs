import { IsString } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
