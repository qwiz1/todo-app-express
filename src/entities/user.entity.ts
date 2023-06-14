import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { TableName } from '../common/enums';
import type { Todo } from './todo.entity';

@Entity(TableName.USERS)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isConfirmed: boolean;

  @OneToMany('Todo', 'user')
  todos: Relation<Todo[]>;
}
