import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDTO } from '../dto/user.create.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  public async create(u: UserCreateDTO) {
    const user = new User();
    user.login = u.login;
    user.password = u.password;

    await this.repo.save(user);

    return user;
  }

  public async findById(id: number) {
    return this.repo.findOne({
      where: {
        id: id,
      },
    });
  }

  public async findByLogin(login: string) {
    return this.repo.findOne({
      where: {
        login: login,
      },
    });
  }

  public async findTasks(id: number) {
    const result = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        tasks: true,
      },
      select: {
        tasks: {
          id: true,
          name: true,
        },
      },
    });

    return result.tasks;
  }
}
