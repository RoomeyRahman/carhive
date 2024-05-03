import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SCHEMA } from '../common/mock';
import { TypeSchema } from './schemas';
import { TypesService } from './services';
import { TypesController } from './controllers';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: SCHEMA.TYPE, schema: TypeSchema },
    ])
  ],

  controllers: [TypesController],
  providers: [TypesService]
})
export class TypesModule { }
