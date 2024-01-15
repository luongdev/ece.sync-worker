import { egmlEmailAttachmentLinkCDCEntity } from "@/cisco-ece-entities-cdc/egml-email-attachment-link.entity";
import { egmlEmailAttachmentLinkEntity } from "@/cisco-ece-entities/egml-email-attachment-link.entity";
import { OPERATION } from "@/constants/constant";
import { LoggerService } from "@/shared/logging";
import { LoggerFactory } from "@/shared/providers/logger/logger.factory";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { CronJob } from "cron";
import { Repository } from "typeorm";

@Injectable()
export class EgmlEmailAttachmentLinkService
    implements OnModuleInit, OnModuleDestroy {
    private readonly _egmlEmailAttachmentLinkJob: CronJob<
        null,
        EgmlEmailAttachmentLinkService
    >;
    private _running = false;
    private readonly _log: LoggerService;
    private readonly limitCountData: number;
    constructor(
        loggerFactory: LoggerFactory,
        private readonly _configService: ConfigService,
        @InjectRepository(egmlEmailAttachmentLinkCDCEntity, "db_source")
        private readonly egmlEmailAttachmentLinkCDCRepository: Repository<egmlEmailAttachmentLinkCDCEntity>,
        @InjectRepository(egmlEmailAttachmentLinkEntity, "db_destination")
        private readonly egmlEmailAttachmentLinkRepository: Repository<egmlEmailAttachmentLinkEntity>
    ) {
        this._log = loggerFactory.createLogger(EgmlEmailAttachmentLinkService);
        const timeJob = this._configService.get("TIME_START_JOB_EGML_EMAIL_ATTACHMENT_LINK") || "*/5 * * * *";
        this.limitCountData = this._configService.get("LIMIT_COUNT_DATA") || 100;
        this._egmlEmailAttachmentLinkJob = CronJob.from({
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
            const findData = await this.egmlEmailAttachmentLinkCDCRepository.find({
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
                                    await this.egmlEmailAttachmentLinkRepository.delete({
                                        emailId: el.emailId,
                                        emailAttachmentId: el.emailAttachmentId
                                    });
                                    await this.egmlEmailAttachmentLinkCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.INSERT:
                                try {
                                    await this.egmlEmailAttachmentLinkRepository.insert(el);
                                    await this.egmlEmailAttachmentLinkCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
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
                                    await this.egmlEmailAttachmentLinkRepository.update(
                                        {
                                            emailId: el.emailId,
                                            emailAttachmentId: el.emailAttachmentId
                                        },
                                        dataUpdate
                                    );
                                    await this.egmlEmailAttachmentLinkCDCRepository.delete({ operation: el.operation, startLSN: el.startLSN, seqVal: el.seqVal, commandId: el.commandId });
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
        this._egmlEmailAttachmentLinkJob.start();
    }

    onModuleDestroy() {
        this._egmlEmailAttachmentLinkJob.stop();
    }
}
