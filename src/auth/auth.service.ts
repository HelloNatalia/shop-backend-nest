import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
// import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupAuthCredentialsDto } from './dto/signup-auth-credentials.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SigninAuthCredentialsDto } from './dto/signin-auth-credentials.dto copy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(
    signupAuthCredentialsDto: SignupAuthCredentialsDto,
  ): Promise<void> {
    const { username, password, name, surname, email } =
      signupAuthCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      name,
      surname,
      email,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    signinAuthCredentialsDto: SigninAuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = signinAuthCredentialsDto;

    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Please, check your login credentials');
    }
  }
}
