import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { DefaultResponseDto } from 'src/shared/dto/default.response';
import { CreateShadeDto } from './dto/create-shade.dto';
import { GetOneShadeResponseDto } from './dto/get-one-shade.response.dto';
import { PaginateFilterDto } from './dto/paginate-filter.dto';
import { PaginateQueryDto } from './dto/paginate.query.dto';
import { PaginateResponseDto } from './dto/paginate.response.dto';
import { ShadeService } from './shade.service';

@ApiTags('Shades flow')
@Controller('shade')
export class ShadeController {
  constructor(private readonly shadeService: ShadeService) {}

  @ApiOperation({ summary: 'Get one shade' })
  @ApiCreatedResponse({
    description: 'Get one shade',
    type: GetOneShadeResponseDto,
  })
  @Get(':id')
  async getOne(
    @Param('id', IdValidationPipe) id: string,
  ): Promise<GetOneShadeResponseDto> {
    return await this.shadeService.getOneById(id);
  }

  @ApiOperation({ summary: 'Get all shades with pagination' })
  @ApiCreatedResponse({
    description: 'Get all shades with pagination',
    type: PaginateResponseDto,
  })
  @Post('paginate')
  @UsePipes(new ValidationPipe())
  async getAllWithPagination(
    @Query() paginationQuery: PaginateQueryDto,
    @Body() paginateFilterDto: PaginateFilterDto,
  ): Promise<PaginateResponseDto> {
    return await this.shadeService.getAll(
      this.shadeService._transformPaginateQuery(paginationQuery),
      paginateFilterDto,
    );
  }

  @ApiOperation({ summary: "Create new color's shade" })
  @ApiCreatedResponse({
    description: "Create new color's shade",
    type: DefaultResponseDto,
  })
  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createShadeDto: CreateShadeDto,
  ): Promise<DefaultResponseDto> {
    return await this.shadeService.create(createShadeDto);
  }
}
