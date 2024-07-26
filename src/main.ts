import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [envs.KAFKA_URL],
        },
        consumer: {
          groupId: envs.KAFKA_CONSUMER,
        },
      },
    },
  );
  app.listen();
}
bootstrap();
