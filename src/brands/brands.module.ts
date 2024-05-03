import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandsController } from './controllers';
import { BrandsService } from './services';
import { SCHEMA } from '../common/mock';
import { BrandSchema } from './schemas';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: SCHEMA.BRAND, schema: BrandSchema },
    ]),
  ],
  controllers: [BrandsController],
  providers: [BrandsService]
})
export class BrandsModule {}
