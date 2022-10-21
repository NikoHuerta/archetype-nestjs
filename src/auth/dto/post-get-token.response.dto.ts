import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class PostGetTokenResponseDto {
  @ApiProperty({
    description: 'accessToken',
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    description: 'Nombre de usuario, lo retorna si es no migrado',
  })
  @Expose()
  name?: string;
}
