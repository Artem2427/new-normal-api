import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class PaginateQueryDto {
  @ApiProperty({ type: Number })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly page: number;

  @ApiProperty({ type: Number })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly pageSize: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  readonly searchTerm?: string;
}
