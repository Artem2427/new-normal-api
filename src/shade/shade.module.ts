import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ColorModule } from 'src/color/color.module';
import ColorModel from 'src/color/model/color.model';
import ShadeModel from './model/shade.model';
import { ShadeRepository } from './repository/shade.repository';
import { ShadeController } from './shade.controller';
import { ShadeService } from './shade.service';

@Module({
  imports: [SequelizeModule.forFeature([ShadeModel, ColorModel]), ColorModule],
  controllers: [ShadeController],
  providers: [ShadeService, ShadeRepository],
})
export class ShadeModule {}
