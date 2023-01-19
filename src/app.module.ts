import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getPostgresConfig } from './configs/postgres.config';
import { ColorModule } from './color/color.module';
import { ShadeModule } from './shade/shade.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    ColorModule,
    ShadeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
