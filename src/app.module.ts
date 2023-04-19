import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './entities/bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './entities/user/user.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    BookmarkModule,
    DbModule,
  ],
})
export class AppModule {}
