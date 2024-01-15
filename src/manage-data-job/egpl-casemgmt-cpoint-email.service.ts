import { egplCasemgmtCpointEmailCDCEntity } from '@/cisco-ece-entities-cdc/egpl-casemgmt-cpoint-email.entity';
import { egplCasemgmtCpointEmailEntity } from '@/cisco-ece-entities/egpl-casemgmt-cpoint-email.entity';
import { OPERATION } from '@/constants/constant';
import { LoggerService } from '@/shared/logging';
import { LoggerFactory } from '@/shared/providers/logger/logger.factory';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Repository } from 'typeorm';

@Injectable()
export class EgplCasemgmtCpointEmailService implements OnModuleInit, OnModuleDestroy {
    private readonly _egplCasemgmtCpointEmailJob: CronJob<null, EgplCasemgmtCpointEmailService>;
    private _running = false;
    private readonly _log: LoggerService;
    private readonly limitCountData: number;
    constructor(
        loggerFactory: LoggerFactory,
        private readonly _configService: ConfigService,
        @InjectRepository(egplCasemgmtCpointEmailCDCEntity, 'db_source')
        private readonly egplCasemgmtCpointEmailCDCRepository: Repository<egplCasemgmtCpointEmailCDCEntity>,
        @InjectRepository(egplCasemgmtCpointEmailEntity, 'db_destination')
        private readonly egplCasemgmtCpointEmailRepository: Repository<egplCasemgmtCpointEmailEntity>,
    ) {
        this._log = loggerFactory.createLogger(EgplCasemgmtCpointEmailService);
        const timeJob = this._configService.get('TIME_START_JOB_EGPL_CASEMGMT_CPOINT_EMAIL') || '*/5 * * * *';
        this.limitCountData = this._configService.get('LIMIT_COUNT_DATA') || 100;
        this._egplCasemgmtCpointEmailJob = CronJob.from({
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
            const findData = await this.egplCasemgmtCpointEmailCDCRepository.find({ take: this.limitCountData });
            if (!findData.length) {
                this._log.info('Not found data to sync !');
            } else {
                for (const el of findData) {
                    try {
                        switch (Number(el.operation)) {
                            case OPERATION.DELETE:
                                try {
                                    await this.egplCasemgmtCpointEmailRepository.delete({ contactPointId: el.contactPointId });
                                    await this.egplCasemgmtCpointEmailCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.INSERT:
                                try {
                                    await this.egplCasemgmtCpointEmailRepository.insert(el);
                                    await this.egplCasemgmtCpointEmailCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.UPDATE_BEFORE:
                            case OPERATION.UPDATE_AFTER:
                                try {
                                    const dataUpdate = { ...el };
                                    delete dataUpdate.commandId;
                                    delete dataUpdate.operation;
                                    delete dataUpdate.startLSN;
                                    delete dataUpdate.seqVal;
                                    await this.egplCasemgmtCpointEmailRepository.update({ contactPointId: el.contactPointId }, dataUpdate);
                                    await this.egplCasemgmtCpointEmailCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
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
        this._egplCasemgmtCpointEmailJob.start();
    }

    onModuleDestroy() {
        this._egplCasemgmtCpointEmailJob.stop();
    }
}
