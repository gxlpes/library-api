import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'src/db/db.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({})], // sign in the jwt to register it, you can provide secrets and such
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
