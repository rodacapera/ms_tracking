import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipment } from './entities/shipments.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
  ) {}

  async getShipment() {
    return await this.shipmentRepository.find();
  }

  async createShipment(data: CreateShipmentDto) {
    const shipment = this.shipmentRepository.create(data);
    const result = await this.shipmentRepository.save(shipment);
    return result;
  }

  getHello(): string {
    return 'Hello World 3002!';
  }
}
