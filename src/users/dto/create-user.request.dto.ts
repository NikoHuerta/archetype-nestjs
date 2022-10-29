import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    description: 'User First Name',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'User Last Name',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'User Email',
    example: 'mail@example.test',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User Password',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User Source',
    example: 'web | facebook | google',
  })
  @IsOptional()
  @IsString()
  @IsIn(['web', 'facebook', 'google'], {
    message: 'Source must be web, facebook or google',
  })
  @IsNotEmpty()
  source?: string;

  @ApiProperty({
    description: 'User Rut',
    example: '12345678-9',
  })
  @IsString()
  @IsNotEmpty()
  rut: string;

  @ApiProperty({
    description: 'User Role',
    example: 'client | admin',
  })
  @IsOptional()
  @IsString()
  @IsIn(['client', 'admin', 'superAdmin'], {
    message: 'Role must be client, admin or superAdmin',
  })
  @IsNotEmpty()
  role?: string;

  @ApiProperty({
    description: 'User Active',
    example: 'true | false',
  })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  active?: boolean;
}
