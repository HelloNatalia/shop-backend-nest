import { Body, Controller, Post } from '@nestjs/common';
import { SignupAuthCredentialsDto } from './dto/signup-auth-credentials.dto';
import { AuthService } from './auth.service';
import { SigninAuthCredentialsDto } from './dto/signin-auth-credentials.dto copy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(
    @Body() signupAuthCredentialsDto: SignupAuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(signupAuthCredentialsDto);
  }

  @Post('signin')
  signIn(
    @Body() signinAuthCredentialsDto: SigninAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signinAuthCredentialsDto);
  }
}
