import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './common/filters';
import { LoggingInterceptor, TransformInterceptor } from './common/interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypesModule } from './types/types.module';
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';
import { RentsModule } from './rents/rents.module';

const DB_CONNECTION = process.env.DB_CONNECTION;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(DB_CONNECTION, {
      autoIndex: true,
    }),
    AuthModule,
    UsersModule,
    TypesModule,
    BrandsModule,
    CarsModule,
    RentsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
