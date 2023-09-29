import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tracking } from './tracking.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('increment')
  @OneToOne((type) => Tracking, (tracking) => tracking.id_tracking)
  id_shipment: number;
  @Column()
  addressee: string;
  @Column()
  sender: string;
  @Column()
  content: string;
  @CreateDateColumn()
  date_shipment: string;
  @Column()
  state: string;
}
