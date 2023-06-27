import { Todo } from '../todo';

type User = {
  id: number;
  email: string;
  password: string;
  todos: Todo[] | null;
};

export type { User };
