import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { clean } from 'rut.js';

import { RutValidator } from '@validators';

export class PostGetTokenRequestDto {
  @ApiProperty({
    description: 'RUT',
    example: '123456789',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => clean(value))
  @Validate(RutValidator)
  rut: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
