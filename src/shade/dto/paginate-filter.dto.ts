import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class PaginateFilterDto {
  @ApiProperty({
    type: [String],
    example: ['1187bef8-c44d-44f4-aa4d-ec3e1e459b1c'],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true, message: 'Not valid Id' })
  colorIds?: string[];
}
