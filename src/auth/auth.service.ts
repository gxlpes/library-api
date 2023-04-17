import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';

import { DbService } from '../db/db.service';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  constructor(private db: DbService) {}

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

  signin() {
    return 'Im signed in';
  }
}
