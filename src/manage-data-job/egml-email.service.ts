import { egmlEmailCDCEntity } from "@/cisco-ece-entities-cdc/egml-email.entity";
import { egmlEmailEntity } from "@/cisco-ece-entities/egml-email.entity";
import { OPERATION } from "@/constants/constant";
import { LoggerService } from "@/shared/logging";
import { LoggerFactory } from "@/shared/providers/logger/logger.factory";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { CronJob } from "cron";
import { Repository } from "typeorm";

@Injectable()
export class EgmlEmailService
    implements OnModuleInit, OnModuleDestroy {
    private readonly _egmlEmailJob: CronJob<
        null,
        EgmlEmailService
    >;
    private _running = false;
    private readonly _log: LoggerService;
    private readonly limitCountData: number;
    constructor(
        loggerFactory: LoggerFactory,
        private readonly _configService: ConfigService,
        @InjectRepository(egmlEmailCDCEntity, "db_source")
        private readonly egmlEmailCDCRepository: Repository<egmlEmailCDCEntity>,
        @InjectRepository(egmlEmailEntity, "db_destination")
        private readonly egmlEmailRepository: Repository<egmlEmailEntity>
    ) {
        this._log = loggerFactory.createLogger(EgmlEmailService);
        const timeJob = this._configService.get("TIME_START_JOB_EGML_EMAIL") || "*/5 * * * *";
        this.limitCountData = this._configService.get("LIMIT_COUNT_DATA") || 100;
        this._egmlEmailJob = CronJob.from({
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
            const findData = await this.egmlEmailCDCRepository.find({
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
                                    await this.egmlEmailRepository.delete({
                                        emailId: el.emailId,
                                    });
                                    await this.egmlEmailCDCRepository.delete(el);
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.INSERT:
                                try {
                                    await this.egmlEmailRepository.insert(el);
                                    await this.egmlEmailCDCRepository.delete(el);
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.UPDATE:
                                try {
                                    await this.egmlEmailRepository.update(
                                        { emailId: el.emailId },
                                        el
                                    );
                                    await this.egmlEmailCDCRepository.delete(el);
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
        this._egmlEmailJob.start();
    }

    onModuleDestroy() {
        this._egmlEmailJob.stop();
    }
}
