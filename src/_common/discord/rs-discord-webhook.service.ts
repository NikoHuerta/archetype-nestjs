import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { RsDiscordWebhookDataResponse } from '@interfaces';

/**
 * DISCORD REST Webhook API Service
 * docs: https://discord.com/developers/docs/resources/webhook#webhook-object
 */
@Injectable()
export class RsDiscordWebhookService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<NodeJS.ProcessEnv>,
  ) {
    this.urlWebhook = `${this.configService.get<string>(
      'DISCORD_WEBHOOK_URL',
    )}/${this.configService.get<string>(
      'DISCORD_WEBHOOK_ID',
    )}/${this.configService.get<string>('DISCORD_WEBHOOK_TOKEN')}`;
  }

  private urlWebhook = '';

  async getWebhookWithToken(): Promise<RsDiscordWebhookDataResponse> {
    const { data } =
      await this.httpService.axiosRef.get<RsDiscordWebhookDataResponse>(
        this.urlWebhook,
      );
    return data;
  }

  async ExecuteWebhook(message: string): Promise<any> {
    const { data } = await this.httpService.axiosRef.post<any>(
      this.urlWebhook + `?wait=true`,
      {
        content: message,
      },
    );
    return data;
  }
}
