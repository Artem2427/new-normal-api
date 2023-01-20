import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<SequelizeModuleOptions> => {
  return {
    dialect: 'postgres',
    uri: configService.get('DATABASE_URI'),
    ssl: false,
    models: [__dirname + '/../**/*.model{.ts,.js}'],
    autoLoadModels: true,
    logging: false,
    define: {
      timestamps: false,
    },
  };
};
