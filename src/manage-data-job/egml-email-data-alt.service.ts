import { egmlEmailDataAltCDCEntity } from "@/cisco-ece-entities-cdc/egml-email-data-alt.entity";
import { egmlEmailDataAltEntity } from "@/cisco-ece-entities/egml-email-data-alt.entity";
import { OPERATION } from "@/constants/constant";
import { LoggerService } from "@/shared/logging";
import { LoggerFactory } from "@/shared/providers/logger/logger.factory";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { CronJob } from "cron";
import { Repository } from "typeorm";

@Injectable()
export class EgmlEmailDataAltService
    implements OnModuleInit, OnModuleDestroy {
    private readonly _egmlEmailDataAltJob: CronJob<
        null,
        EgmlEmailDataAltService
    >;
    private _running = false;
    private readonly _log: LoggerService;
    private readonly limitCountData: number;
    constructor(
        loggerFactory: LoggerFactory,
        private readonly _configService: ConfigService,
        @InjectRepository(egmlEmailDataAltCDCEntity, "db_source")
        private readonly egmlEmailDataAltCDCRepository: Repository<egmlEmailDataAltCDCEntity>,
        @InjectRepository(egmlEmailDataAltEntity, "db_destination")
        private readonly egmlEmailDataAltRepository: Repository<egmlEmailDataAltEntity>
    ) {
        this._log = loggerFactory.createLogger(EgmlEmailDataAltService);
        const timeJob = this._configService.get("TIME_START_JOB_EGML_EMAIL_DATA_ALT") || "*/5 * * * *";
        this.limitCountData = this._configService.get("LIMIT_COUNT_DATA") || 100;
        this._egmlEmailDataAltJob = CronJob.from({
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
            const findData = await this.egmlEmailDataAltCDCRepository.find({
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
                                    await this.egmlEmailDataAltRepository.delete({
                                        emailId: el.emailId,
                                    });
                                    await this.egmlEmailDataAltCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.INSERT:
                                try {
                                    await this.egmlEmailDataAltRepository.insert(el);
                                    await this.egmlEmailDataAltCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
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
                                    await this.egmlEmailDataAltRepository.update(
                                        { emailId: el.emailId },
                                        dataUpdate
                                    );
                                    await this.egmlEmailDataAltCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
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
        this._egmlEmailDataAltJob.start();
    }

    onModuleDestroy() {
        this._egmlEmailDataAltJob.stop();
    }
}
