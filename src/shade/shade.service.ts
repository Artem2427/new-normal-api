import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DefaultResponseDto } from 'src/shared/dto/default.response';
import { CreateShadeDto } from './dto/create-shade.dto';
import { GetOneShadeResponseDto } from './dto/get-one-shade.response.dto';
import { PaginateFilterDto } from './dto/paginate-filter.dto';
import { PaginateQueryDto } from './dto/paginate.query.dto';
import { PaginateResponseDto } from './dto/paginate.response.dto';
import { NOT_FOUND_SHADE, SHADE_ALREADY_EXISTS } from './errors/errors';
import { ShadeRepository } from './repository/shade.repository';
import { IPaginateParams } from './types/paginate-params.interface';

@Injectable()
export class ShadeService {
  constructor(private readonly shadeRepository: ShadeRepository) {}

  async getOneById(id: string): Promise<GetOneShadeResponseDto> {
    const shade = await this.shadeRepository.findOneById(id);

    if (!shade) {
      throw new NotFoundException(NOT_FOUND_SHADE);
    }

    return {
      shade,
    };
  }

  async getAll(
    paginateParams: IPaginateParams,
    paginateFilterDto: PaginateFilterDto,
  ): Promise<PaginateResponseDto> {
    const take = paginateParams.pageSize || 12;
    const skip = (paginateParams.page - 1) * take;

    return await this.shadeRepository.findAllWithPaginate({
      take,
      skip,
      searchTerm: paginateParams.searchTerm,
      colorIds: paginateFilterDto.colorIds,
    });
  }

  async create(createShadeDto: CreateShadeDto): Promise<DefaultResponseDto> {
    const shade = await this.shadeRepository.findByHex(createShadeDto.hex);

    if (shade) {
      throw new BadRequestException(SHADE_ALREADY_EXISTS);
    }

    await this.shadeRepository.create(createShadeDto);

    return {
      message: 'Shade was successfully added',
    };
  }

  _transformPaginateQuery(paginationQuery: PaginateQueryDto): IPaginateParams {
    return {
      page: Number(paginationQuery.page),
      pageSize: Number(paginationQuery.pageSize),
      searchTerm: paginationQuery.searchTerm
        ? paginationQuery.searchTerm.trim()
        : '',
    };
  }
}
