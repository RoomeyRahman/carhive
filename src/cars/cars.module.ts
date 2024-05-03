import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsController } from './controllers/cars.controller';
import { CarsService } from './services/cars.service';
import { SCHEMA } from '../common/mock';
import { CarSchema } from './schemas';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: SCHEMA.CAR, schema: CarSchema },
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule {}
