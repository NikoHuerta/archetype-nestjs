import { Injectable, ConsoleLogger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  log(message: string, context?: any) {
    if (typeof context === 'object') {
      super.log(`${message}, ${JSON.stringify(context, null, 2)}`);
      return;
    }
    super.log(message, context);
  }
}
