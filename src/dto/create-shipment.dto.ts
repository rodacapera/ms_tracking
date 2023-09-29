import { IsString } from 'class-validator';

export class CreateShipmentDto {
  @IsString()
  readonly addressee: string;
  @IsString()
  readonly sender: string;
  @IsString()
  readonly content: string;
  @IsString()
  readonly state: string;
}
