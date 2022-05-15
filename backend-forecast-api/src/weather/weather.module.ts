import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule,
    UserModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
