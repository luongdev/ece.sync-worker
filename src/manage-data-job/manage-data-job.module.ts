import { Module } from '@nestjs/common';
import { ManageDataJobService } from './manage-data-job.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerProviderModule } from '@/shared/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { egplCasemgmtCaseAssCDCEntity } from '@/cisco-ece-entities-cdc/egpl_casemgmt_case_ass.entity';
import { egplCasemgmtCaseAssEntity } from '@/cisco-ece-entities/egpl_casemgmt_case_ass.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      egplCasemgmtCaseAssCDCEntity
    ], 'db_source'),
    TypeOrmModule.forFeature([
      egplCasemgmtCaseAssEntity
    ], 'db_destination'),
    ConfigModule,
    LoggerProviderModule,
  ],
  providers: [ManageDataJobService]
})
export class ManageDataJobModule { }
