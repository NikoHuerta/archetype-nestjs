export interface RsDiscordWebhookDataResponse {
  id: string;
  type: number;
  guild_id?: string;
  channel_id: string | null;
  user?: RsDiscordUserObject;
  name: string | null;
  avatar: string | null;
  token?: string;
  application_id: string | null;
  source_guild?: object;
  source_channel?: object;
  url?: string;
}

export interface RsDiscordUserObject {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot?: boolean;
  system?: boolean;
  mfa_enabled: boolean;
  banner?: string | null;
  accent_color: number | null;
  locale?: string;
  verified: boolean;
  email?: string | null;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}
