import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BigIntInterceptor } from './interceptors/bigint.interceptor';
import { TypologiesModule } from './typologies/typologies.module';

@Module({
  imports: [RestaurantsModule, TypologiesModule],
  controllers: [AppController],
  providers: [AppService, {provide:APP_INTERCEPTOR, useClass:BigIntInterceptor}],
})
export class AppModule {}
