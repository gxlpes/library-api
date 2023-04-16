import { Injectable } from '@nestjs/common';
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
    const user = await this.db.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    // return the saved user
    return user;
  }

  signin() {
    return 'Im signed in';
  }
}
