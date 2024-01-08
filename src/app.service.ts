import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/logging';
import { LoggerFactory } from '@shared/providers/logger/logger.factory';

@Injectable()
export class AppService {

  private readonly _log: LoggerService;

  constructor(loggerFactory: LoggerFactory) {
    this._log = loggerFactory.createLogger();
  }

  get logger(): LoggerService {
    return this._log;
  }
}
