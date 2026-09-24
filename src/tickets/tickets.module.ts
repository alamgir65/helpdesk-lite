import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TicketsController } from './tickets.controller.js';
import { TicketsService } from './tickets.service.js';
import { RequestLoggerMiddleware } from '../common/request-logger.middleware.js';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService]
})

// kono middleware ke kono module er shathe bind kora jabe, tai amra NestModule interface ke implement korbo. Ekhane configure method ke override kore middleware ke apply kora hobe.
export class TicketsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes(TicketsController);
  }
}
