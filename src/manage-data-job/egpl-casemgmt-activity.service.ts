import { egplCasemgmtActivityCDCEntity } from '@/cisco-ece-entities-cdc/egpl-casemgmt-activity.entity';
import { egplCasemgmtActivityEntity } from '@/cisco-ece-entities/egpl-casemgmt-activity.entity';
import { OPERATION } from '@/constants/constant';
import { LoggerService } from '@/shared/logging';
import { LoggerFactory } from '@/shared/providers/logger/logger.factory';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Repository } from 'typeorm';

@Injectable()
export class EgplCasemgmtActivityService implements OnModuleInit, OnModuleDestroy {
    private readonly _egplCasemgmtActivityJob: CronJob<null, EgplCasemgmtActivityService>;
    private _running = false;
    private readonly _log: LoggerService;
    private readonly limitCountData: number;
    constructor(
        loggerFactory: LoggerFactory,
        private readonly _configService: ConfigService,
        @InjectRepository(egplCasemgmtActivityCDCEntity, 'db_source')
        private readonly egplCasemgmtActivityCDCRepository: Repository<egplCasemgmtActivityCDCEntity>,
        @InjectRepository(egplCasemgmtActivityEntity, 'db_destination')
        private readonly egplCasemgmtActivityRepository: Repository<egplCasemgmtActivityEntity>,
    ) {
        this._log = loggerFactory.createLogger(EgplCasemgmtActivityService);
        const timeJob = this._configService.get('TIME_START_JOB_EGPL_CASEMGMT_ACTIVITY') || '*/5 * * * *';
        this.limitCountData = this._configService.get('LIMIT_COUNT_DATA') || 100;
        this._egplCasemgmtActivityJob = CronJob.from({
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
            const findData = await this.egplCasemgmtActivityCDCRepository.find({ take: this.limitCountData });
            if (!findData.length) {
                this._log.info('Not found data to sync !');
            } else {
                for (const el of findData) {
                    try {
                        switch (Number(el.operation)) {
                            case OPERATION.DELETE:
                                try {
                                    await this.egplCasemgmtActivityRepository.delete({ activityId: el.activityId });
                                    await this.egplCasemgmtActivityCDCRepository.delete(el);
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.INSERT:
                                try {
                                    await this.egplCasemgmtActivityRepository.insert(el);
                                    await this.egplCasemgmtActivityCDCRepository.delete(el);
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.UPDATE:
                                try {
                                    await this.egplCasemgmtActivityRepository.update({ activityId: el.activityId }, el);
                                    await this.egplCasemgmtActivityCDCRepository.delete(el);
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            default:
                                return this._log.info(`Job sync with operation ${el.operation} not in enum !`);;
                        }
                    } catch (error) {
                        throw new Error(error.message);
                    }
                }
                this._log.info('Job sync complete !');
            }
        } catch (e) {
            this._log.info(`Job sync data error: ${e.message}`);
        }
    }

    onModuleInit() {
        this._egplCasemgmtActivityJob.start();
    }

    onModuleDestroy() {
        this._egplCasemgmtActivityJob.stop();
    }
}
