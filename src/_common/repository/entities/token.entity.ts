import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { User } from './user.entity';

@Index(['id'], { unique: true })
@Entity('token', { schema: 'public' })
export class Token {
  @Column('character varying', { name: 'algorithm', length: 30 })
  algorithm: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('character varying', { name: 'channel', length: 30 })
  channel: string;

  @Column('character varying', { name: 'token', length: 400 })
  token: string;

  @Column('bigint', { name: 'user_id' })
  userId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Event, (event) => event.token)
  events: Event[];

  @ManyToOne(() => User, (user) => user.tokens)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
