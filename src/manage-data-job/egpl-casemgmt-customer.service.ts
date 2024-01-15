import { egplCasemgmtCustomerCDCEntity } from '@/cisco-ece-entities-cdc/egpl-casemgmt-customer.entity';
import { egplCasemgmtCustomerEntity } from '@/cisco-ece-entities/egpl-casemgmt-customer.entity';
import { OPERATION } from '@/constants/constant';
import { LoggerService } from '@/shared/logging';
import { LoggerFactory } from '@/shared/providers/logger/logger.factory';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Repository } from 'typeorm';

@Injectable()
export class EgplCasemgmtCustomerService implements OnModuleInit, OnModuleDestroy {
    private readonly _egplCasemgmtCustomerJob: CronJob<null, EgplCasemgmtCustomerService>;
    private _running = false;
    private readonly _log: LoggerService;
    private readonly limitCountData: number;
    constructor(
        loggerFactory: LoggerFactory,
        private readonly _configService: ConfigService,
        @InjectRepository(egplCasemgmtCustomerCDCEntity, 'db_source')
        private readonly egplCasemgmtCustomerCDCRepository: Repository<egplCasemgmtCustomerCDCEntity>,
        @InjectRepository(egplCasemgmtCustomerEntity, 'db_destination')
        private readonly egplCasemgmtCustomerRepository: Repository<egplCasemgmtCustomerEntity>,
    ) {
        this._log = loggerFactory.createLogger(EgplCasemgmtCustomerService);
        const timeJob = this._configService.get('TIME_START_JOB_EGPL_CASEMGMT_CUSTOMER') || '*/5 * * * *';
        this.limitCountData = this._configService.get('LIMIT_COUNT_DATA') || 100;
        this._egplCasemgmtCustomerJob = CronJob.from({
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
            const findData = await this.egplCasemgmtCustomerCDCRepository.find({ take: this.limitCountData });
            if (!findData.length) {
                this._log.info('Not found data to sync !');
            } else {
                for (const el of findData) {
                    try {
                        switch (Number(el.operation)) {
                            case OPERATION.DELETE:
                                try {
                                    await this.egplCasemgmtCustomerRepository.delete({ customerId: el.customerId });
                                    await this.egplCasemgmtCustomerCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.INSERT:
                                try {
                                    await this.egplCasemgmtCustomerRepository.insert(el);
                                    await this.egplCasemgmtCustomerCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
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
                                    await this.egplCasemgmtCustomerRepository.update({ customerId: el.customerId }, dataUpdate);
                                    await this.egplCasemgmtCustomerCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
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
        this._egplCasemgmtCustomerJob.start();
    }

    onModuleDestroy() {
        this._egplCasemgmtCustomerJob.stop();
    }
}
