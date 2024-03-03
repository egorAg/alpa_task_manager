import { IsDateString, IsString } from 'class-validator';

export class TaskUpdateDTO {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsDateString()
  deadline?: Date;
}
