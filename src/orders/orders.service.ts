import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movement } from 'src/movements/entities/movement.entity';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<Movement>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async createIncome(createOrderDto: CreateOrderDto) {
    const { local, totalPrice, paymentMethod, createdAt, description, client } =
      createOrderDto;

    if (!local || !totalPrice || !paymentMethod || !createdAt || !description) {
      throw new UnauthorizedException('Missing required fields');
    }

    const newMovement = await this.movementModel.create({
      type: 'income',
      amount: totalPrice,
      local,
      paymentMethod,
      createdAt,
      client,
    });

    if (!newMovement || !newMovement._id) {
      throw new Error('Error al crear el movimiento, _id no generado.');
    }

    const newOrder = await this.orderModel.create({
      local,
      totalPrice,
      paymentMethod,
      createdAt,
      description,
      idMovement: newMovement._id,
      client,
    });

    return { message: 'Order created', order: newOrder, movement: newMovement };
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

    return await this.orderModel.find(filter);
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async findByDate(date: string) {
    const today = dayjs(date)
      .tz('America/Argentina/Buenos_Aires')
      .startOf('day');
    const tomorrow = today.add(1, 'day');
    return await this.orderModel.find({
      createdAt: {
        $gte: today.toDate(),
        $lt: tomorrow.toDate(),
      },
    });
  }

  async findByDateAndLocal(date: string, local: string) {
    const today = dayjs(date)
      .tz('America/Argentina/Buenos_Aires')
      .startOf('day');
    const tomorrow = today.add(1, 'day');
    return await this.orderModel.find({
      createdAt: {
        $gte: today.toDate(),
        $lt: tomorrow.toDate(),
      },
      local,
    });
  }

  async remove(id: string) {
    const order = await this.orderModel.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.movementModel.findByIdAndDelete(order.idMovement);
    await this.orderModel.findByIdAndDelete(id);

    return { message: 'Order deleted successfully' };
  }
}
