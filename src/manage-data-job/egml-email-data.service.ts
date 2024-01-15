import { egmlEmailDataCDCEntity } from "@/cisco-ece-entities-cdc/egml_email_data.entity";
import { egmlEmailDataEntity } from "@/cisco-ece-entities/egml_email_data.entity";
import { OPERATION } from "@/constants/constant";
import { LoggerService } from "@/shared/logging";
import { LoggerFactory } from "@/shared/providers/logger/logger.factory";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { CronJob } from "cron";
import { Repository } from "typeorm";

@Injectable()
export class EgmlEmailDataService
    implements OnModuleInit, OnModuleDestroy {
    private readonly _egmlEmailDataJob: CronJob<
        null,
        EgmlEmailDataService
    >;
    private _running = false;
    private readonly _log: LoggerService;
    private readonly limitCountData: number;
    constructor(
        loggerFactory: LoggerFactory,
        private readonly _configService: ConfigService,
        @InjectRepository(egmlEmailDataCDCEntity, "db_source")
        private readonly egmlEmailDataCDCRepository: Repository<egmlEmailDataCDCEntity>,
        @InjectRepository(egmlEmailDataEntity, "db_destination")
        private readonly egmlEmailDataRepository: Repository<egmlEmailDataEntity>
    ) {
        this._log = loggerFactory.createLogger(EgmlEmailDataService);
        const timeJob = this._configService.get("TIME_START_JOB_EGML_EMAIL_DATA") || "*/5 * * * *";
        this.limitCountData = this._configService.get("LIMIT_COUNT_DATA") || 100;
        this._egmlEmailDataJob = CronJob.from({
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
            this._log.info("Start job sync data !");
            const findData = await this.egmlEmailDataCDCRepository.find({
                take: this.limitCountData,
            });
            if (!findData.length) {
                this._log.info("Not found data to sync !");
            } else {
                for (const el of findData) {
                    try {
                        switch (Number(el.operation)) {
                            case OPERATION.DELETE:
                                try {
                                    await this.egmlEmailDataRepository.delete({
                                        emailId: el.emailId,
                                    });
                                    await this.egmlEmailDataCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.INSERT:
                                try {
                                    await this.egmlEmailDataRepository.insert(el);
                                    await this.egmlEmailDataCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
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
                                    await this.egmlEmailDataRepository.update(
                                        { emailId: el.emailId },
                                        dataUpdate
                                    );
                                    await this.egmlEmailDataCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            default:
                                return this._log.info(
                                    `Job sync with operation ${el.operation} not in enum !`
                                );
                        }
                    } catch (error) {
                        throw new Error(error.message);
                    }
                }
                this._log.info("Job sync complete !");
            }
        } catch (e) {
            this._log.info(`Job sync data error: ${e.message}`);
        }
    }

    onModuleInit() {
        this._egmlEmailDataJob.start();
    }

    onModuleDestroy() {
        this._egmlEmailDataJob.stop();
    }
}
