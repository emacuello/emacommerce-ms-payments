import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envs } from './envs';

export const config = {
  type: 'mysql',
  host: envs.MYSQL_HOST,
  port: envs.MYSQL_PORT,
  username: envs.MYSQL_USER,
  password: envs.MYSQL_PASSWORD,
  database: envs.MYSQL_DATABASE,
  entities: [],
  synchronize: true,
} as TypeOrmModuleOptions;
