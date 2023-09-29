import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShipmentDto, CreateTrackingDto } from './dto';
import { Tracking } from './entities/tracking.entity';

import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(Tracking)
    private readonly trackingRepository: Repository<Tracking>,
    private readonly httpService: HttpService,
  ) {}

  async getTracking() {
    return await this.trackingRepository.find({ relations: ['id_shipment'] });
  }

  async getTrackingById(id_tracking: number) {
    return await this.trackingRepository.findOne({
      where: { id_tracking },
      relations: ['id_shipment'],
    });
  }

  async createTracking(data: CreateTrackingDto) {
    const tracking = this.trackingRepository.create(data);
    const result = await this.trackingRepository.save(tracking);
    return result;
  }

  async sendNotify(body: CreateShipmentDto) {
    const message = JSON.stringify({
      title: `the product ${body.content} is in progress`,
    });
    const { data } = await firstValueFrom(
      this.httpService
        .post('http://localhost:3001/notification', message, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
