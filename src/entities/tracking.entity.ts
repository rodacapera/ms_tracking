import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shipment } from './shipments.entity';

@Entity()
export class Tracking {
  @PrimaryGeneratedColumn('increment')
  id_tracking: number;
  @OneToOne((type) => Shipment, (shipment) => shipment.id_shipment, {
    cascade: true,
  })
  @JoinColumn({ name: 'fk_shipment' })
  id_shipment: number;
  @Column()
  location: string;
  @CreateDateColumn()
  date: string;
  @Column()
  state: string;
}
