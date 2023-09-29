import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.shipment.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipments.entity';
import { TrackingService } from './app.tracking.service';
import { Tracking } from './entities/tracking.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin1234',
      database: 'kiki-db',
      autoLoadEntities: true,
      synchronize: true,
      // logging: 'all',
    }),
    TypeOrmModule.forFeature([Shipment]),
    TypeOrmModule.forFeature([Tracking]),
    ClientsModule.register([
      {
        name: 'SHIPMENTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'shipment_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'TRACKING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'tracking_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, TrackingService],
})
export class AppModule {}
