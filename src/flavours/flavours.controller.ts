import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FlavoursService } from './flavours.service';
import { CreateFlavourDto } from './dto/create-flavour.dto';
import { UpdateFlavourDto } from './dto/update-flavour.dto';

@Controller('flavours')
export class FlavoursController {
  constructor(private readonly flavoursService: FlavoursService) {}

  @Post()
  create(@Body() createFlavourDto: CreateFlavourDto) {
    return this.flavoursService.create(createFlavourDto);
  }

  @Get()
  findAll() {
    return this.flavoursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flavoursService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlavourDto: UpdateFlavourDto) {
    return this.flavoursService.update(id, updateFlavourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flavoursService.remove(id);
  }
}
