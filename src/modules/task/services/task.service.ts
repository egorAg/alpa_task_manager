import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { TaskCreateDTO } from '../dto/task.create.dto';
import { TaskUpdateDTO } from '../dto/task.update.dto';
import { TaskRepository } from '../repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly taskRepo: TaskRepository,
  ) {}

  public async createNewTask(data: TaskCreateDTO, userId: number) {
    const user = await this.userRepo.findById(userId);

    const task = await this.taskRepo.create(data, user);

    return this.taskRepo.getById(task.id);
  }

  public async getAllByUserId(id: number) {
    return this.userRepo.findTasks(id);
  }

  public async getById(id: number) {
    return this.taskRepo.getById(id);
  }

  public async updateTask(data: TaskUpdateDTO, taskId: number, userId: number) {
    const task = await this.taskRepo.getById(taskId, true);
    if (task.user.id !== userId) {
      throw new HttpException(
        'You not owner of this task',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.taskRepo.update({
      ...task,
      name: data.name || task.name,
      description: data.description || task.description,
      deadline: data.deadline || task.deadline,
    });

    return this.taskRepo.getById(task.id);
  }

  public async deleteTask(id: number, userId: number) {
    const task = await this.taskRepo.getById(id, true);

    if (task.user.id !== userId) {
      throw new HttpException(
        'You not owner of this task',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.taskRepo.delete(id);
  }
}
