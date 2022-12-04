import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RsDiscordWebhookService } from './rs-discord-webhook.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [RsDiscordWebhookService],
  exports: [RsDiscordWebhookService],
})
export class DiscordModule {}
