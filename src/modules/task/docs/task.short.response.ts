import { ApiProperty } from '@nestjs/swagger';

export class TaskShortResponse {
  @ApiProperty({
    type: ' number',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: 'string',
    example: 'Do something....',
  })
  name: string;
}
