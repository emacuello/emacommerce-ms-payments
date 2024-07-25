import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envs } from './envs';
import { Payment } from 'src/contexts/payments/infrastructure/typeorm/payment.entitie';

export const config = {
  type: 'mysql',
  host: envs.MYSQL_HOST,
  port: envs.MYSQL_PORT,
  username: envs.MYSQL_USER,
  password: envs.MYSQL_PASSWORD,
  database: envs.MYSQL_DATABASE,
  entities: [Payment],
  synchronize: true,
} as TypeOrmModuleOptions;
