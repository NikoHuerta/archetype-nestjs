import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ChannelEnum } from '@enums';

export const ChannelDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    let channel: ChannelEnum;

    if (request.header('user-agent').toLowerCase().includes('mobile')) {
      channel = ChannelEnum.Mobile;
    } else {
      channel = ChannelEnum.Web;
    }

    return channel;
  },
);
