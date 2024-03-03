import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class TaskCreateDTO {
  @ApiProperty({
    name: 'name',
    description: 'Task name',
    example: 'Do something',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    name: 'description',
    description: 'Task description',
    example: 'Do something with...',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    name: 'deadline',
    description: 'Task deadline',
    example: new Date(),
  })
  @IsNotEmpty()
  @IsDateString()
  deadline: Date;
}
