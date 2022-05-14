import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthenticationModule,
    PrismaModule,
    UserModule,
    AuthModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
