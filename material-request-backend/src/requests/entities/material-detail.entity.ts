import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Request } from './request.entity';

@Entity('material_details')
export class MaterialDetail {
  @PrimaryGeneratedColumn()
  id: number;

  // Kolom FK eksplisit
  @Column({ name: 'request_id' })
  requestId: number;

  @ManyToOne(() => Request, (request) => request.materials, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'request_id' })
  request: Request;

  @Column({ name: 'material_code', nullable: true })
  materialCode?: string;

  @Column({ name: 'material_description' })
  materialDescription: string;

  @Column({ name: 'material_type' })
  materialType: string;

  @Column('decimal', { precision: 12, scale: 2 })
  quantity: number;

  @Column()
  unit: string;

  @Column({ nullable: true })
  uom?: string;

  @Column({ type: 'date', name: 'needed_date' })
  neededDate: string;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
