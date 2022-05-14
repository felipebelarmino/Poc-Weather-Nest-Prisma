import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthenticationModule,
    PrismaModule,
    UserModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
