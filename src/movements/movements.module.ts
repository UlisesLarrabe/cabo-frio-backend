import { Module } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movement, MovementSchema } from './entities/movement.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movement.name, schema: MovementSchema },
    ]),
  ],
  controllers: [MovementsController],
  providers: [MovementsService],
})
export class MovementsModule {}
