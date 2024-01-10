import { egplCasemgmtCaseAssCDCEntity } from '@/cisco-ece-entities-cdc/egpl_casemgmt_case_ass.entity';
import { egplCasemgmtCaseAssEntity } from '@/cisco-ece-entities/egpl_casemgmt_case_ass.entity';
import { OPERATION } from '@/constants/constant';
import { LoggerService } from '@/shared/logging';
import { LoggerFactory } from '@/shared/providers/logger/logger.factory';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Repository } from 'typeorm';

@Injectable()
export class ManageDataJobService implements OnModuleInit, OnModuleDestroy {
  private readonly _egplCasemgmtCaseAssJob: CronJob<null, ManageDataJobService>;
  private _running = false;
  private readonly _log: LoggerService;
  private readonly limitCountData: number;
  constructor(
    loggerFactory: LoggerFactory,
    private readonly _configService: ConfigService,
    @InjectRepository(egplCasemgmtCaseAssCDCEntity, 'db_source')
    private readonly egplCasemgmtCaseAssCDCRepository: Repository<egplCasemgmtCaseAssCDCEntity>,
    @InjectRepository(egplCasemgmtCaseAssEntity, 'db_destination')
    private readonly egplCasemgmtCaseAssRepository: Repository<egplCasemgmtCaseAssEntity>,
  ) {
    this._log = loggerFactory.createLogger(ManageDataJobService);
    const timeJob = this._configService.get('TIME_START_JOB') || '*/5 * * * *';
    this.limitCountData = this._configService.get('LIMIT_COUNT_DATA') || 100;
    this._egplCasemgmtCaseAssJob = CronJob.from({
      cronTime: timeJob,
      onTick: async () => {
        if (!this._running) {
          this._running = true;
          await this.startJob();
          this._running = false;
        } else {
          this._log.error(`This job will be ignore until previous run finish!`);
        }
      },
      runOnInit: false,
      context: this,
    });
  }

  async startJob() {
    try {
      this._log.info('Start job sync data !');
      const findData = await this.egplCasemgmtCaseAssCDCRepository.find({ take: this.limitCountData });
      if (!findData.length) {
        this._log.info('Not found data to sync !');
      } else {
        for (const el of findData) {
          try {
            switch (Number(el.operation)) {
              case OPERATION.DELETE:
                try {
                  await this.egplCasemgmtCaseAssRepository.delete({ caseId: el.caseId, caseGroupId: el.caseGroupId });
                  await this.egplCasemgmtCaseAssCDCRepository.delete(el);
                } catch (error) {
                  throw new Error(error.message);
                }
                break;
              case OPERATION.INSERT:
                try {
                  await this.egplCasemgmtCaseAssRepository.insert(el);
                  await this.egplCasemgmtCaseAssCDCRepository.delete(el);
                } catch (error) {
                  throw new Error(error.message);
                }
                break;
              case OPERATION.UPDATE:
                try {
                  await this.egplCasemgmtCaseAssRepository.update({ caseId: el.caseId, caseGroupId: el.caseGroupId }, el);
                  await this.egplCasemgmtCaseAssCDCRepository.delete(el);
                } catch (error) {
                  throw new Error(error.message);
                }
                break;
              default:
                return this._log.info(`Job sync egplCasemgmtCaseAssRepository with operation ${el.operation} not in enum !`);;
            }
          } catch (error) {
            throw new Error(error.message);
          }
        }
        this._log.info('Job sync egplCasemgmtCaseAssRepository complete !');
      }
    } catch (e) {
      this._log.info(`Job sync data error: ${e.message}`);
    }
  }

  onModuleInit() {
    this._egplCasemgmtCaseAssJob.start();
  }

  onModuleDestroy() {
    this._egplCasemgmtCaseAssJob.stop();
  }
}
