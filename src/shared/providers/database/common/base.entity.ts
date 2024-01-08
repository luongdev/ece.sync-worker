import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { randomUUID } from 'crypto';

@Entity()
export abstract class BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	  id: string;

	@CreateDateColumn()
	  createdAt: Date;

	@UpdateDateColumn()
	  updatedAt: Date;

	@Column({ type: 'uuid', nullable: true })
	  createdBy: string;

	@Column({ type: 'uuid', nullable: true })
	  updatedBy: string;

	@BeforeInsert()
	beforeInsertActions() {
	  this.createdAt = new Date();
	  this.updatedAt = this.createdAt;
	  this.id = randomUUID();
	}

	@BeforeUpdate()
	beforeUpdateActions() {
	  this.updatedAt = new Date();
	}
}
