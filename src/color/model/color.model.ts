import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasMany,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import ShadeModel from 'src/shade/model/shade.model';

interface ColorCreationAttrs {
  name: string;
}

@Table({ tableName: 'colors' })
class ColorModel extends Model<ColorModel, ColorCreationAttrs> {
  @ApiProperty({ type: String })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => ShadeModel)
  shades: ShadeModel[];
}

export default ColorModel;
