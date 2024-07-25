import { Module } from '@nestjs/common';
import { config } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(config)],
})
export class AppModule {}
