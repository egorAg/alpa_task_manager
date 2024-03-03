import { Task } from 'src/modules/task/entities/task';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'login',
    type: 'varchar',
  })
  login: string;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
