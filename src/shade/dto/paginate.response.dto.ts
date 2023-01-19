import { ApiProperty } from '@nestjs/swagger';
import ShadeModel from '../model/shade.model';

export class PaginateResponseDto {
  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: [ShadeModel] })
  shades: ShadeModel[];
}
