import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, LoginDto } from './auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ message: string }> {
    return this.authService.login(loginDto);
  }
}