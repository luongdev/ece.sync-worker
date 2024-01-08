import { Module } from '@nestjs/common';
import { LoggingModule, LoggerService } from '@shared/logging';

import * as moment from 'moment/moment';
import { LoggerFactory } from './logger.factory';
import * as winston from 'winston';

const parse = function (str: any, args = []) {
  let i = 0;

  if (!str) return str;

  if (!(str instanceof String)) str = str.toString();

  return str.replace(/{}/g, () => {
    const replacement = args[i++];

    if (replacement && replacement instanceof Date) {
      return moment(replacement, false).format('YYYY-MM-DD HH:mm:ss');
    } else if (replacement && replacement instanceof String) {
      return replacement;
    } else if (replacement && replacement instanceof Array) {
      return (replacement || []).join(', ');
    }

    return replacement;
  });
};

const winstonPrintfFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(info => {
    const { timestamp, level, message, args } = info;
    let marker = info.context
      ? info.context
      : info.marker
        ? info.marker
        : 'main';
    if (!(marker instanceof String)) marker = marker.name;

    const cleanLevel = (level ?? 'unknown').replace(/\u001b\[\d+m/g, '');

    return JSON.stringify({
      timestamp,
      marker,
      level: cleanLevel,
      message: parse(message, args.length ? args[0] : undefined),
    });
  })
);

@Module({
  imports: [
    LoggingModule.registerAsync({
      imports: [],
      level: process.env.LOG_LEVEL || 'info',
      levels: winston.config.syslog.levels,
      exitOnError: false,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winstonPrintfFormat
          ),
        }),
      ],
    }),
  ],
  providers: [
    LoggerFactory,
    {
      provide: LoggerService,
      useFactory: (loggerFactory: LoggerFactory) => {
        return loggerFactory.createLogger('FSU');
      },
      inject: [LoggerFactory],
    },
  ],
  exports: [LoggerFactory, LoggerService],
})
export class LoggerProviderModule {
}
