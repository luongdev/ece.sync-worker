import { egplRoutingQueueCDCEntity } from '@/cisco-ece-entities-cdc/egpl-routing-queue.entity';
import { egplRoutingQueueEntity } from '@/cisco-ece-entities/egpl-routing-queue.entity';
import { OPERATION } from '@/constants/constant';
import { LoggerService } from '@/shared/logging';
import { LoggerFactory } from '@/shared/providers/logger/logger.factory';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Repository } from 'typeorm';

@Injectable()
export class EgplRoutingQueueService implements OnModuleInit, OnModuleDestroy {
    private readonly _egplRoutingQueueJob: CronJob<null, EgplRoutingQueueService>;
    private _running = false;
    private readonly _log: LoggerService;
    private readonly limitCountData: number;
    constructor(
        loggerFactory: LoggerFactory,
        private readonly _configService: ConfigService,
        @InjectRepository(egplRoutingQueueCDCEntity, 'db_source')
        private readonly egplRoutingQueueCDCRepository: Repository<egplRoutingQueueCDCEntity>,
        @InjectRepository(egplRoutingQueueEntity, 'db_destination')
        private readonly egplRoutingQueueRepository: Repository<egplRoutingQueueEntity>,
    ) {
        this._log = loggerFactory.createLogger(EgplRoutingQueueService);
        const timeJob = this._configService.get('TIME_START_JOB_EGPL_ROUTING_QUEUE') || '*/5 * * * *';
        this.limitCountData = this._configService.get('LIMIT_COUNT_DATA') || 100;
        this._egplRoutingQueueJob = CronJob.from({
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
            const findData = await this.egplRoutingQueueCDCRepository.find({ take: this.limitCountData });
            if (!findData.length) {
                this._log.info('Not found data to sync !');
            } else {
                for (const el of findData) {
                    try {
                        switch (Number(el.operation)) {
                            case OPERATION.DELETE:
                                try {
                                    await this.egplRoutingQueueRepository.delete({ queueId: el.queueId });
                                    await this.egplRoutingQueueCDCRepository.delete(el);
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.INSERT:
                                try {
                                    await this.egplRoutingQueueRepository.insert(el);
                                    await this.egplRoutingQueueCDCRepository.delete(el);
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.UPDATE:
                                try {
                                    await this.egplRoutingQueueRepository.update({ queueId: el.queueId }, el);
                                    await this.egplRoutingQueueCDCRepository.delete(el);
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
        this._egplRoutingQueueJob.start();
    }

    onModuleDestroy() {
        this._egplRoutingQueueJob.stop();
    }
}
