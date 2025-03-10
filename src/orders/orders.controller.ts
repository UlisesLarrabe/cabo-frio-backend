import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('income')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createIncome(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':local')
  findAllWithLocal(@Param('local') local?: string) {
    return this.ordersService.findAll(local);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get('date/:date')
  findByDate(@Param('date') date: string) {
    return this.ordersService.findByDate(date);
  }

  @Get('date/:date/:local')
  findByDateAndLocal(
    @Param('date') date: string,
    @Param('local') local: string,
  ) {
    return this.ordersService.findByDateAndLocal(date, local);
  }
}
