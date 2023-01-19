import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { CreateColorDto } from '../dto/create-color.dto';
import { NOT_FOUND_COLOR } from '../errors/errors';
import ColorModel from '../model/color.model';

@Injectable()
export class ColorRepository {
  constructor(
    @InjectModel(ColorModel)
    private readonly colorRepository: typeof ColorModel,
  ) {}

  async getAll() {
    return await this.colorRepository.findAll();
  }

  async findOneByName(name: string) {
    return await this.colorRepository.findOne({ where: { name } });
  }

  async create(createColorDto: CreateColorDto) {
    return await this.colorRepository.create(createColorDto);
  }
}

// if (!color) {
//     throw new NotFoundException(NOT_FOUND_COLOR);
//   }
