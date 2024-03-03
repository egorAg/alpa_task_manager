import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthDTO {
  @ApiProperty({
    name: 'login',
    description: 'User login used for auth',
    example: 'admin',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    name: 'password',
    description: 'User password used for auth',
    example: 'qweQWE123!',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
