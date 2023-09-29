import { CreateShipmentDto } from './dto';
import { Repository } from 'typeorm';
import { Shipment } from './entities/shipments.entity';
export declare class AppService {
    private readonly shipmentRepository;
    constructor(shipmentRepository: Repository<Shipment>);
    getShipment(): Promise<Shipment[]>;
    createShipment(data: CreateShipmentDto): Promise<Shipment>;
    getHello(): string;
}
