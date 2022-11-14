import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';

import { TelegramBotService } from './telegram-bot.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.TELEGRAM_BOT_TOKEN,
      }),
    }),
  ],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
