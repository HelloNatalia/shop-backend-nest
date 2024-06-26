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
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Role } from './role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
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
      roles: [Role.Client],
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
  ): Promise<{ accessToken: string }> {
    const { username, password } = signinAuthCredentialsDto;

    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please, check your login credentials');
    }
  }
}
