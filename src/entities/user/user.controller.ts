import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../../decorator';
import { JwtGuard } from '../../guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('/me')
  getMe(@GetUser() user: User, @GetUser('email') email: string) {
    console.log(user);

    console.log(email);
    return user;
  }
}
