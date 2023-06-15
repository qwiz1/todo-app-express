import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { TableName } from '../common/enums';
import type { User } from './user.entity';

@Entity(TableName.TODOS)
class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ default: false })
  isPrivate: boolean;

  @ManyToOne('User', 'todos')
  user: Relation<User>;
}

export { Todo };
