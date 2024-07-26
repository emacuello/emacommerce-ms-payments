import { Module } from '@nestjs/common';
import { config } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from './contexts/payments/infrastructure/nestjs/module/payments.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), PaymentsModule],
})
export class AppModule {}
