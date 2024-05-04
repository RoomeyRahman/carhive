import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RentsController } from './controllers/rents.controller';
import { RentsService } from './services/rents.service';
import { SCHEMA } from '../common/mock';
import { RentSchema } from './schemas';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: SCHEMA.RENT, schema: RentSchema },
    ]),
  ],
  controllers: [RentsController],
  providers: [RentsService]
})
export class RentsModule {}
