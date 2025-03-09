import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movement } from './entities/movement.entity';
import { Model } from 'mongoose';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<Movement>,
  ) {}
  async create(createMovementDto: CreateMovementDto) {
    const { local, amount, type, paymentMethod, createdAt } = createMovementDto;
    if (!local || !amount || !type || !paymentMethod || !createdAt) {
      throw new UnauthorizedException('All fields are required');
    }
    const movement = await this.movementModel.create(createMovementDto);
    return { message: 'Movement created successfully', movement };
  }

  async findAll(local?: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (local) {
      return await this.movementModel.find({
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
        local,
      });
    }

    return await this.movementModel.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });
  }

  async findOne(id: string) {
    const movement = await this.movementModel.findById(id);
    if (!movement) {
      throw new NotFoundException('Movement not found');
    }
    return movement;
  }
}
