/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional() // optional property - users will not always update both email and password
  password: string;
}