import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import ColorModel from 'src/color/model/color.model';
import { CreateShadeDto } from '../dto/create-shade.dto';
import ShadeModel from '../model/shade.model';

interface IPagination {
  take: number;
  skip: number;
  searchTerm: string;
  colorIds: string[];
}

@Injectable()
export class ShadeRepository {
  constructor(
    @InjectModel(ShadeModel)
    private readonly shadeRepository: typeof ShadeModel,
  ) {}

  async findOneById(id: string) {
    return await this.shadeRepository.findOne({ where: { id } });
  }

  async findByHex(hex: string) {
    return await this.shadeRepository.findOne({ where: { hex } });
  }

  async findAllByColorId(colorId: string) {
    return await this.shadeRepository.findAll({ where: { colorId } });
  }

  async create(createShadeDto: CreateShadeDto) {
    return await this.shadeRepository.create(createShadeDto);
  }

  async findAllWithPaginate({ take, skip, searchTerm, colorIds }: IPagination) {
    const shades = await this.shadeRepository.findAndCountAll({
      where: {
        colorId: { [colorIds.length ? Op.in : Op.notIn]: colorIds },
      },
      offset: skip,
      limit: take,
      include: [
        {
          model: ColorModel,
          where: { name: { [Op.iLike]: `%${searchTerm}%` } },
        },
      ],
    });

    return {
      total: shades.count,
      shades: shades.rows,
    };
  }
}
