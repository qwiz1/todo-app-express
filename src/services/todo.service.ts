import { DeleteResult, Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import {
  TodoCreateDTOPayload,
  TodoUpdateDTOPayload,
} from '../common/types/todo';

type Constructor = {
  todoRepository: Repository<Todo>;
};

class TodoService {
  todoRepository: Repository<Todo>;

  constructor({ todoRepository }: Constructor) {
    this.todoRepository = todoRepository;
  }

  public async create(createTodoDto: TodoCreateDTOPayload): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    const createdTodo = await this.todoRepository.save(todo);
    return createdTodo;
  }

  public getAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  public getById(id: number): Promise<Todo | null> {
    return this.todoRepository.findOne({
      relations: { user: true },
      where: { id },
    });
  }

  public getAllowedTodos(userId: number): Promise<Todo[]> {
    return this.todoRepository.find({
      where: [{ user: { id: userId } }, { isPrivate: false }],
    });
  }

  public update(
    id: number,
    updateTodoDto: TodoUpdateDTOPayload,
  ): Promise<Partial<Todo>> {
    return this.todoRepository.save({ id, ...updateTodoDto });
  }

  public delete(id: number): Promise<DeleteResult> {
    return this.todoRepository.delete(id);
  }
}

export default TodoService;
