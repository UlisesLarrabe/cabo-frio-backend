import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateFlavourDto } from './dto/create-flavour.dto';
import { UpdateFlavourDto } from './dto/update-flavour.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Flavour } from './entities/flavour.entity';
import { Model } from 'mongoose';

@Injectable()
export class FlavoursService {
  constructor(
    @InjectModel(Flavour.name) private flavourModel: Model<Flavour>,
  ) {}
  async create(createFlavourDto: CreateFlavourDto) {
    const { name, local, stock } = createFlavourDto;
    if (!name || !local || !stock) {
      throw new UnauthorizedException('Missing required fields');
    }
    const newFlavour = await this.flavourModel.create(createFlavourDto);
    return { message: 'Flavour created', flavour: newFlavour };
  }

  async findAll() {
    return await this.flavourModel.find();
  }

  async findOne(id: string) {
    const flavour = await this.flavourModel.findById(id);
    if (!flavour) {
      throw new NotFoundException('Flavour not found');
    }
    return flavour;
  }

  async update(id: string, updateFlavourDto: UpdateFlavourDto) {
    const flavour = await this.findOne(id);
    if (!flavour) {
      throw new NotFoundException('Flavour not found');
    }
    await this.flavourModel.findByIdAndUpdate(
      id,
      { $set: updateFlavourDto },
      { new: true },
    );
    return { message: 'Flavour updated', flavour };
  }

  remove(id: string) {
    return `This action removes a #${id} flavour`;
  }
}
