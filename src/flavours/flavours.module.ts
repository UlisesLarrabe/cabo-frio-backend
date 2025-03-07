import { Module } from '@nestjs/common';
import { FlavoursService } from './flavours.service';
import { FlavoursController } from './flavours.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Flavour, FlavourSchema } from './entities/flavour.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flavour.name, schema: FlavourSchema }]),
  ],
  controllers: [FlavoursController],
  providers: [FlavoursService],
})
export class FlavoursModule {}
