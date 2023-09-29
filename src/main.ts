import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  for (const queue of ['shipment_queue', 'tracking_queue']) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue,
        queueOptions: {
          durable: false,
        },
      },
    });
  }
  await app.startAllMicroservices();
  await app.listen(3002);
  // await app.init();
}
bootstrap();
