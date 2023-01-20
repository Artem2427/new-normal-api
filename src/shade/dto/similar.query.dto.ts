import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class SililarQueryDto {
  @ApiProperty({ type: Number })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  count: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsUUID('all', { each: true, message: 'Not valid Id' })
  readonly colorId: string;
}
