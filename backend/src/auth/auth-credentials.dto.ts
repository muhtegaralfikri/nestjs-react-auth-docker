import { IsString, MinLength, IsEmail, MaxLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password harus minimal 8 karakter' })
  password: string;
}

export class LoginDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}