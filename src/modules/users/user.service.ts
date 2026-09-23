import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/modules/users/user.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Transactional()
  async create(email: string, passwordHash: string): Promise<User> {
    try {
      const userInstance = this.userRepository.create({
        email,
        password: passwordHash,
      });
      return await this.userRepository.save(userInstance);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email: email } });
  }
}
