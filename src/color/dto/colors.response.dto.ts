import { ApiProperty } from '@nestjs/swagger';
import ColorModel from '../model/color.model';

export class ColorsResponseDto {
  @ApiProperty({ type: [ColorModel] })
  colors: ColorModel[];
}
