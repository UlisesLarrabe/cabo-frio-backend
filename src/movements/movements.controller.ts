import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post()
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.movementsService.create(createMovementDto);
  }

  @Get()
  findAll() {
    return this.movementsService.findAll();
  }

  @Get('filters')
  findByDateAndLocalAndTypeAndPaymentMethod(
    @Query('date') date: string,
    @Query('local') local: string,
    @Query('type') type: string,
    @Query('paymentMethod') paymentMethod: string,
  ) {
    return this.movementsService.findByDateAndLocalAndTypeAndPaymentMethod(
      date,
      local,
      type,
      paymentMethod,
    );
  }

  @Get('month/:month')
  findByMonth(@Param('month') month: string) {
    return this.movementsService.findByMonth(month);
  }

  @Get(':local')
  findAllWithLocal(@Param('local') local?: string) {
    return this.movementsService.findAll(local);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movementsService.findOne(id);
  }
}
