import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<SequelizeModuleOptions> => {
  console.log(configService.get('DATABASE_URI'));

  return {
    dialect: 'postgres',
    // host: 'dpg-cf4pa69a6gdl6lrfu9e0-a',
    // port: 5432,
    // username: 'new_normal_user',
    // password: '1yV4ViQzkceDAjevaP2fP1urJ99dcUzL',
    // database: 'new_normal',
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
