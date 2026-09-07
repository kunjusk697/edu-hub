import {
  Body,
  Controller,
  Post
} from '@nestjs/common';

import {
  IsEmail,
  IsString,
  MinLength
} from 'class-validator';

import { AuthService } from './auth.service';

class RegisterDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

class LoginDto {

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

@Controller('auth')
export class AuthController {

  constructor(
    private auth: AuthService
  ) {}

  @Post('register')
  register(
    @Body() data: RegisterDto
  ) {

    return this.auth.register(
      data.name,
      data.email,
      data.password
    );
  }

  @Post('login')
  login(
    @Body() data: LoginDto
  ) {

    return this.auth.login(
      data.email,
      data.password
    );
  }
}
