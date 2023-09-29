import { Repository } from 'typeorm';
import { CreateShipmentDto, CreateTrackingDto } from './dto';
import { Tracking } from './entities/tracking.entity';
import { HttpService } from '@nestjs/axios';
export declare class TrackingService {
    private readonly trackingRepository;
    private readonly httpService;
    constructor(trackingRepository: Repository<Tracking>, httpService: HttpService);
    getTracking(): Promise<Tracking[]>;
    getTrackingById(id_tracking: number): Promise<Tracking>;
    createTracking(data: CreateTrackingDto): Promise<Tracking>;
    sendNotify(body: CreateShipmentDto): Promise<any>;
}
