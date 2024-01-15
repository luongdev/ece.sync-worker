import { egplCasemgmtCaseCDCEntity } from '@/cisco-ece-entities-cdc/egpl-casemgmt-case.entity';
import { egplCasemgmtCaseEntity } from '@/cisco-ece-entities/egpl-casemgmt-case.entity';
import { OPERATION } from '@/constants/constant';
import { LoggerService } from '@/shared/logging';
import { LoggerFactory } from '@/shared/providers/logger/logger.factory';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Repository } from 'typeorm';

@Injectable()
export class EgplCasemgmtCaseService implements OnModuleInit, OnModuleDestroy {
    private readonly _egplCasemgmtCaseJob: CronJob<null, EgplCasemgmtCaseService>;
    private _running = false;
    private readonly _log: LoggerService;
    private readonly limitCountData: number;
    constructor(
        loggerFactory: LoggerFactory,
        private readonly _configService: ConfigService,
        @InjectRepository(egplCasemgmtCaseCDCEntity, 'db_source')
        private readonly egplCasemgmtCaseCDCRepository: Repository<egplCasemgmtCaseCDCEntity>,
        @InjectRepository(egplCasemgmtCaseEntity, 'db_destination')
        private readonly egplCasemgmtCaseRepository: Repository<egplCasemgmtCaseEntity>,
    ) {
        this._log = loggerFactory.createLogger(EgplCasemgmtCaseService);
        const timeJob = this._configService.get('TIME_START_JOB_EGPL_CASEMGMT_CASE') || '*/5 * * * *';
        this.limitCountData = this._configService.get('LIMIT_COUNT_DATA') || 100;
        this._egplCasemgmtCaseJob = CronJob.from({
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
            const findData = await this.egplCasemgmtCaseCDCRepository.find({ take: this.limitCountData });
            if (!findData.length) {
                this._log.info('Not found data to sync !');
            } else {
                for (const el of findData) {
                    try {
                        switch (Number(el.operation)) {
                            case OPERATION.DELETE:
                                try {
                                    await this.egplCasemgmtCaseRepository.delete({ caseId: el.caseId });
                                    await this.egplCasemgmtCaseCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.INSERT:
                                try {
                                    await this.egplCasemgmtCaseRepository.insert(el);
                                    await this.egplCasemgmtCaseCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
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
                                    await this.egplCasemgmtCaseRepository.update({ caseId: el.caseId }, dataUpdate);
                                    await this.egplCasemgmtCaseCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
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
        this._egplCasemgmtCaseJob.start();
    }

    onModuleDestroy() {
        this._egplCasemgmtCaseJob.stop();
    }
}
