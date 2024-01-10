import { egplEventHistoryCaseMgmtCDCEntity } from '@/cisco-ece-entities-cdc/egpl_event_history_case_mgmt.entity';
import { egplEventHistoryCaseMgmtEntity } from '@/cisco-ece-entities/egpl_event_history_case_mgmt.entity';
import { OPERATION } from '@/constants/constant';
import { LoggerService } from '@/shared/logging';
import { LoggerFactory } from '@/shared/providers/logger/logger.factory';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Repository } from 'typeorm';

@Injectable()
export class EgplEventHistoryCasemgmtService implements OnModuleInit, OnModuleDestroy {
    private readonly _egplEventHistoryCasemgmtJob: CronJob<null, EgplEventHistoryCasemgmtService>;
    private _running = false;
    private readonly _log: LoggerService;
    private readonly limitCountData: number;
    constructor(
        loggerFactory: LoggerFactory,
        private readonly _configService: ConfigService,
        @InjectRepository(egplEventHistoryCaseMgmtCDCEntity, 'db_source')
        private readonly egplEventHistoryCaseMgmtCDCRepository: Repository<egplEventHistoryCaseMgmtCDCEntity>,
        @InjectRepository(egplEventHistoryCaseMgmtEntity, 'db_destination')
        private readonly egplEventHistoryCaseMgmtRepository: Repository<egplEventHistoryCaseMgmtEntity>,
    ) {
        this._log = loggerFactory.createLogger(EgplEventHistoryCasemgmtService);
        const timeJob = this._configService.get('TIME_START_JOB_EGPL_EVENT_HISTORY_CASE_MGMT') || '*/5 * * * *';
        this.limitCountData = this._configService.get('LIMIT_COUNT_DATA') || 100;
        this._egplEventHistoryCasemgmtJob = CronJob.from({
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
            const findData = await this.egplEventHistoryCaseMgmtCDCRepository.find({ take: this.limitCountData });
            if (!findData.length) {
                this._log.info('Not found data to sync !');
            } else {
                for (const el of findData) {
                    try {
                        switch (Number(el.operation)) {
                            case OPERATION.DELETE:
                                try {
                                    await this.egplEventHistoryCaseMgmtRepository.delete({ eventId: el.eventId, eventDate: el.eventDate });
                                    await this.egplEventHistoryCaseMgmtCDCRepository.delete(el);
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.INSERT:
                                try {
                                    await this.egplEventHistoryCaseMgmtRepository.insert(el);
                                    await this.egplEventHistoryCaseMgmtCDCRepository.delete(el);
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.UPDATE:
                                try {
                                    await this.egplEventHistoryCaseMgmtRepository.update({ eventId: el.eventId, eventDate: el.eventDate }, el);
                                    await this.egplEventHistoryCaseMgmtCDCRepository.delete(el);
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
        this._egplEventHistoryCasemgmtJob.start();
    }

    onModuleDestroy() {
        this._egplEventHistoryCasemgmtJob.stop();
    }
}
