import { MessagePattern, Transport } from '@nestjs/microservices';
import { AppService } from './app.shipment.service';
import { CreateShipmentDto } from './dto';
import { TrackingService } from './app.tracking.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly trackingService: TrackingService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/tracking')
  getTracking(): Promise<any> {
    return this.trackingService.getTracking();
  }

  @Get('/tracking/:id')
  getTrackingById(@Param('id') id: number): Promise<any> {
    return this.trackingService.getTrackingById(id);
  }

  @MessagePattern({ cmd: 'create-shipment' }, Transport.RMQ)
  async createShipment(data: CreateShipmentDto): Promise<any> {
    const shipmentResult = await this.appService.createShipment(data);
    const trackingData = {
      id_shipment: shipmentResult.id_shipment,
      location: 'some location',
      state: 'pending',
    };
    const trackingResult = this.trackingService.createTracking(trackingData);
    this.trackingService.sendNotify(data);
    return shipmentResult;
  }

  @MessagePattern({ cmd: 'get-shipment' }, Transport.RMQ)
  async getShipment(): Promise<any> {
    return this.appService.getShipment();
  }
}
