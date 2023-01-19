import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import ShadeModel from 'src/shade/model/shade.model';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';
import ColorModel from './model/color.model';
import { ColorRepository } from './repository/color.repository';

@Module({
  imports: [SequelizeModule.forFeature([ColorModel, ShadeModel])],
  controllers: [ColorController],
  providers: [ColorService, ColorRepository],
})
export class ColorModule {}
