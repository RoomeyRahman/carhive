import { Module } from '@nestjs/common';
import { RentsController } from './controllers/rents.controller';
import { RentsService } from './services/rents.service';

@Module({
  controllers: [RentsController],
  providers: [RentsService]
})
export class RentsModule {}
