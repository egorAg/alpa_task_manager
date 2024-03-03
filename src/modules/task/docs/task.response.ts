import { ApiProperty } from '@nestjs/swagger';

export class TaskResponse {
  @ApiProperty({
    type: 'number',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: 'string',
    example: 'Do something',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'Do something with...',
  })
  description: string;

  @ApiProperty({
    type: 'date',
    example: new Date(),
  })
  deadline: Date;

  @ApiProperty({
    type: 'date',
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    type: 'date',
    example: new Date(),
  })
  updatedAt: Date;
}
