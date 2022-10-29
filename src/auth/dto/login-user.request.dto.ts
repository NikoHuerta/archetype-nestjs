import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserRequestDto {
  @ApiProperty({
    description: 'User Email',
    example: 'na.huertaf@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User Password',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
