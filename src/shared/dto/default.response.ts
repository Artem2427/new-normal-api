import { ApiProperty } from '@nestjs/swagger';

export class DefaultResponseDto {
  @ApiProperty({ type: String })
  message: string;
}
