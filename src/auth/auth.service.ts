import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as argon from 'argon2';
import { DbService } from 'src/db/db.service';

import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  constructor(private db: DbService, private jwt: JwtService) {}

  async signup(dto: AuthDto) {
    // generate the passsword hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db

    try {
      const user = await this.db.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      delete user.hash;

      // return the saved user
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.message);
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.db.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    delete user.hash;
    return user;
  }

  async signToken(userId: number, email: string) {
    const data = {
      sub: userId,
      email,
    };

    return this.jwt.sign;
  }
}
