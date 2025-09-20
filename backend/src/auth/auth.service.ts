// backend/src/auth/auth.service.ts
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto, LoginDto } from './auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, email, password } = authCredentialsDto;

    const userExists = await this.usersRepository.findOneBy({ email });
    if (userExists) {
      throw new ConflictException('Email sudah terdaftar');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      email,
      passwordHash: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException('Gagal menyimpan pengguna');
    }
  }

  async login(loginDto: LoginDto): Promise<{ message: string }> {
    const { username, password } = loginDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return { message: 'Login berhasil' };
    } else {
      throw new UnauthorizedException('Kredensial tidak valid');
    }
  }
}