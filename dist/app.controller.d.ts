import { AppService } from './app.shipment.service';
import { CreateShipmentDto } from './dto';
import { TrackingService } from './app.tracking.service';
export declare class AppController {
    private readonly appService;
    private readonly trackingService;
    constructor(appService: AppService, trackingService: TrackingService);
    getHello(): string;
    getTracking(): Promise<any>;
    getTrackingById(id: number): Promise<any>;
    createShipment(data: CreateShipmentDto): Promise<any>;
    getShipment(): Promise<any>;
}
