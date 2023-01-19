import { ApiProperty } from '@nestjs/swagger';
import ShadeModel from '../model/shade.model';

export class GetOneShadeResponseDto {
  @ApiProperty({ type: ShadeModel })
  shade: ShadeModel;
}
