import { ApiProperty } from '@nestjs/swagger';
import { ChannelEnum, RoleEnum } from '@enums';

export class AccessTokenDto {
  @ApiProperty()
  readonly sub: string;

  @ApiProperty({
    enum: ChannelEnum,
  })
  readonly channel: ChannelEnum;

  @ApiProperty({
    enum: RoleEnum,
  })
  readonly role: RoleEnum;

  @ApiProperty()
  readonly iss: string;
}
