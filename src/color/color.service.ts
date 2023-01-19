import { BadRequestException, Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/shared/dto/default.response';
import { ColorsResponseDto } from './dto/colors.response.dto';
import { CreateColorDto } from './dto/create-color.dto';
import { COLOR_WITH_THIS_NAME_ALREADY_EXISTS } from './errors/errors';
import { ColorRepository } from './repository/color.repository';

@Injectable()
export class ColorService {
  constructor(private readonly colorRepository: ColorRepository) {}

  async getAll(): Promise<ColorsResponseDto> {
    const colors = await this.colorRepository.getAll();
    return { colors };
  }

  async create(createColorDto: CreateColorDto): Promise<DefaultResponseDto> {
    const color = await this.colorRepository.findOneByName(createColorDto.name);

    if (color) {
      throw new BadRequestException(
        COLOR_WITH_THIS_NAME_ALREADY_EXISTS(color.name),
      );
    }

    const newColor = await this.colorRepository.create(createColorDto);

    return {
      message: `Color ${newColor.name} was successfully created`,
    };
  }
}
