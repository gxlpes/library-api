import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { BookmarkModule } from './entities/bookmark/bookmark.module';
import { UserController } from './entities/user/user.controller';
import { UserModule } from './entities/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    BookmarkModule,
    DbModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
