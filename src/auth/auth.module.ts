import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [JwtModule.register({})], // sign in the jwt to register it, you can provide secrets and such
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
