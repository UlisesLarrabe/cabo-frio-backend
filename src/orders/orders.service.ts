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

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<Movement>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async createIncome(createOrderDto: CreateOrderDto) {
    const { local, totalPrice, paymentMethod, createdAt, description } =
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
    });

    return { message: 'Order created', order: newOrder, movement: newMovement };
  }

  async findAll(local?: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (local) {
      return await this.orderModel.find({
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
        local,
      });
    }

    return await this.orderModel.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async findByDate(date: string) {
    const today = dayjs(date);
    const tomorrow = today.add(1, 'day');
    return await this.orderModel.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });
  }

  async findByDateAndLocal(date: string, local: string) {
    const today = dayjs(date);
    const tomorrow = today.add(1, 'day');
    return await this.orderModel.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
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
