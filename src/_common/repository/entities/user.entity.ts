import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Token } from './token.entity';
import { RoleEnum } from '@enums';

@Index(['id'], { unique: true })
@Index(['rut'], { unique: true })
@Entity('users', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'rut',
    unique: true,
    length: 30,
  })
  rut: string;

  @Column('character varying', {
    name: 'role',
    length: 128,
    default: RoleEnum.client,
  })
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Event, (event) => event.userId)
  events: Event[];

  @OneToMany(() => Token, (token) => token.userId)
  tokens: Token[];
}
