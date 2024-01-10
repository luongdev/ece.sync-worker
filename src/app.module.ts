import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseProviderModule } from '@shared/providers';
import { ConfigModule } from '@nestjs/config';
import { LoggerProviderModule } from './shared/providers';
import { ManageDataJobModule } from './manage-data-job/manage-data-job.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseProviderModule,
    LoggerProviderModule,
    ManageDataJobModule,
  ],
  providers: [AppService],
})

export class AppModule { }