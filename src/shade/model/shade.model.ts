import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import ColorModel from 'src/color/model/color.model';

interface ShadeCreationAttrs {
  hex: string;
  colorId: string;
}

@Table({ tableName: 'shades' })
class ShadeModel extends Model<ShadeModel, ShadeCreationAttrs> {
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
  hex: string;

  @ApiProperty({ type: String })
  @ForeignKey(() => ColorModel)
  @Column({ type: DataType.UUID, allowNull: false })
  colorId: string;

  @ApiProperty({ type: ColorModel })
  @BelongsTo(() => ColorModel)
  color: ColorModel;
}

export default ShadeModel;
