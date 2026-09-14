import {
  Injectable,
  UnauthorizedException
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private db: PrismaService,
    private jwt: JwtService
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    roles: any[] = ['STUDENT']
  ) {

    const existing =
      await this.db.user.findUnique({
        where: { email }
      });

    if (existing) {
      throw new UnauthorizedException(
        'Email already registered'
      );
    }

    const passwordHash =
      await bcrypt.hash(password, 12);

    const user =
      await this.db.user.create({
        data: {
          name,
          email,
          passwordHash,
          roles
        }
      });

    if (roles.includes('STUDENT')) {

      await this.db.student.create({
        data: {
          userId: user.id
        }
      });

    }

    return this.sign(user);
  }

  async login(
    email: string,
    password: string
  ) {

    const user =
      await this.db.user.findUnique({
        where: { email }
      });

    if (
      !user ||
      !(await bcrypt.compare(
        password,
        user.passwordHash
      ))
    ) {

      throw new UnauthorizedException(
        'Invalid credentials'
      );
    }

    return this.sign(user);
  }

  private sign(user: any) {

    return {

      accessToken:
        this.jwt.sign({
          sub: user.id,
          roles: user.roles
        }),

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles
      }

    };
  }
}
