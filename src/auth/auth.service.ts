import { BadRequestException, Injectable } from '@nestjs/common';
// import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, name, surname, email } = authCredentialsDto;

    const user = this.usersRepository.create({
      username,
      password,
      name,
      surname,
      email,
    });

    this.usersRepository.save(user);
  }
}
