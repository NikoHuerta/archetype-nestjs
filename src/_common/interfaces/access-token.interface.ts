import { ChannelEnum, RoleEnum } from '@enums';

export interface AccessToken {
  readonly sub: string;
  readonly channel: ChannelEnum;
  readonly role: RoleEnum;
  readonly iss: string;
  readonly hash?: string;
}
