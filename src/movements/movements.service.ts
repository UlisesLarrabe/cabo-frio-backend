import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movement } from './entities/movement.entity';
import { Model } from 'mongoose';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

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
    const today = dayjs().tz('America/Argentina/Buenos_Aires').startOf('day');
    const tomorrow = today.add(1, 'day');

    const filter: Record<string, any> = {
      createdAt: {
        $gte: today.toDate(),
        $lt: tomorrow.toDate(),
      },
    };

    if (local) {
      filter.local = local;
    }

    return await this.movementModel.find(filter);
  }

  async findOne(id: string) {
    const movement = await this.movementModel.findById(id);
    if (!movement) {
      throw new NotFoundException('Movement not found');
    }
    return movement;
  }

  async findByDateAndLocalAndTypeAndPaymentMethod(
    date: string,
    local?: string,
    type?: string,
    paymentMethod?: string,
  ) {
    const today = dayjs(date)
      .tz('America/Argentina/Buenos_Aires')
      .startOf('day');
    const tomorrow = today.add(1, 'day');

    const filter: Record<string, any> = {
      createdAt: {
        $gte: today.toDate(),
        $lt: tomorrow.toDate(),
      },
    };

    if (local && local !== 'all') {
      filter.local = local;
    }

    if (type && type !== 'all') {
      filter.type = type;
    }

    if (paymentMethod && paymentMethod !== 'all') {
      filter.paymentMethod = paymentMethod;
    }

    const movements = await this.movementModel.find(filter);
    return movements;
  }
}
