import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Token } from './token.entity';

@Index(['id'], { unique: true })
@Entity('event', { schema: 'public' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('character varying', { name: 'origin_ip', length: 250 })
  originIp: string;

  @Column('character varying', {
    name: 'request_header_useragent',
    nullable: true,
    length: 250,
  })
  requestHeaderUserAgent: string | null;

  @Column('character varying', {
    name: 'request_header_referer',
    nullable: true,
    length: 250,
  })
  requestHeaderReferer: string | null;

  @Column('bigint', { name: 'user_id', nullable: true })
  userId: number | null;

  @Column('bigint', { name: 'token_id', nullable: true })
  tokenId: number | null;

  @Column('character varying', { name: 'event_type', length: 30 })
  eventType: string;

  @Column('character varying', { name: 'channel', length: 30 })
  channel: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.events, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Token, (token) => token.events)
  @JoinColumn([{ name: 'token_id', referencedColumnName: 'id' }])
  token: Token;
}
