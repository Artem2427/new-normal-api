import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DefaultResponseDto } from 'src/shared/dto/default.response';
import { ColorService } from './color.service';
import { ColorsResponseDto } from './dto/colors.response.dto';
import { CreateColorDto } from './dto/create-color.dto';

@ApiTags('Color flow')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @ApiOperation({ summary: 'Get all colors' })
  @ApiCreatedResponse({
    description: 'Get all colors',
    type: ColorsResponseDto,
  })
  @Get('all')
  async getAll(): Promise<ColorsResponseDto> {
    return await this.colorService.getAll();
  }

  @ApiOperation({ summary: 'Create new color' })
  @ApiCreatedResponse({
    description: 'Create new color',
    type: DefaultResponseDto,
  })
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createColorDto: CreateColorDto): Promise<DefaultResponseDto> {
    return this.colorService.create(createColorDto);
  }
}
