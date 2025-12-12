import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MaterialDetail } from './material-detail.entity';

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'request_no', unique: true })
  requestNo: string;

  @Column({ type: 'date', name: 'request_date' })
  requestDate: string;

  @Column()
  requester: string;

  @Column()
  department: string;

  @Column({ default: 'PENDING' })
  status: string; // contoh: PENDING, APPROVED, REJECTED

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => MaterialDetail, (detail) => detail.request, {
    cascade: true, // save/update material sekaligus
    eager: true,   // otomatis load saat get Request
  })
  materials: MaterialDetail[];
}
