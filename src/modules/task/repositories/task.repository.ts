import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { TaskCreateDTO } from '../dto/task.create.dto';
import { Task } from '../entities/task';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task) private readonly repo: Repository<Task>,
  ) {}

  public async create(data: TaskCreateDTO, user: User) {
    const task = new Task();
    task.description = data.description;
    task.name = data.name;
    task.deadline = data.deadline;
    task.user = user;

    await this.repo.save(task);

    return task;
  }

  public async getById(id: number, relations = false) {
    const options: FindOneOptions<Task> = {
      where: {
        id,
      },
    };
    if (relations) {
      options.relations = {
        user: true,
      };
    }
    return this.repo.findOne(options);
  }

  public async update(data: Partial<Task>) {
    await this.repo.save(data);
  }

  public async delete(id: number) {
    await this.repo.delete({ id });
  }
}
