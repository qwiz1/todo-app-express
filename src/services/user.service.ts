import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

type Constructor = {
  userRepository: Repository<User>;
};

class UserService {
  userRepository: Repository<User>;

  constructor({ userRepository }: Constructor) {
    this.userRepository = userRepository;
  }

  public async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async getById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  public async getByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }
}

export default UserService;
