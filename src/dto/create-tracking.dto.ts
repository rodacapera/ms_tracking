import { IsString } from 'class-validator';

export class CreateTrackingDto {
  @IsString()
  readonly id_shipment: number;
  @IsString()
  readonly location: string;
  @IsString()
  readonly state: string;
}
