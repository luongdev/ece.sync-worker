import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseProviderModule } from '@shared/providers';
import { ConfigModule } from '@nestjs/config';
import { LoggerProviderModule } from './shared/providers';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseProviderModule,
    LoggerProviderModule,
  ],
  providers: [AppService],
})

export class AppModule { }