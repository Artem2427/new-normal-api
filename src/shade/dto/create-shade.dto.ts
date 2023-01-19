import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class CreateShadeDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsUUID('all', { each: true, message: 'Not valid Id' })
  readonly colorId: string;

  @ApiProperty({ type: String, nullable: false })
  @IsNotEmpty()
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Enter correct hex',
  })
  readonly hex: string;
}
