import { egplNotesCDCEntity } from '@/cisco-ece-entities-cdc/egpl-notes.entity';
import { egplNotesEntity } from '@/cisco-ece-entities/egpl-notes.entity';
import { OPERATION } from '@/constants/constant';
import { LoggerService } from '@/shared/logging';
import { LoggerFactory } from '@/shared/providers/logger/logger.factory';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Repository } from 'typeorm';

@Injectable()
export class EgplNoteService implements OnModuleInit, OnModuleDestroy {
    private readonly _egplNoteJob: CronJob<null, EgplNoteService>;
    private _running = false;
    private readonly _log: LoggerService;
    private readonly limitCountData: number;
    constructor(
        loggerFactory: LoggerFactory,
        private readonly _configService: ConfigService,
        @InjectRepository(egplNotesCDCEntity, 'db_source')
        private readonly egplNotesCDCRepository: Repository<egplNotesCDCEntity>,
        @InjectRepository(egplNotesEntity, 'db_destination')
        private readonly egplNotesRepository: Repository<egplNotesEntity>,
    ) {
        this._log = loggerFactory.createLogger(EgplNoteService);
        const timeJob = this._configService.get('TIME_START_JOB_EGPL_NOTE') || '*/5 * * * *';
        this.limitCountData = this._configService.get('LIMIT_COUNT_DATA') || 100;
        this._egplNoteJob = CronJob.from({
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
            const findData = await this.egplNotesCDCRepository.find({ take: this.limitCountData });
            if (!findData.length) {
                this._log.info('Not found data to sync !');
            } else {
                for (const el of findData) {
                    try {
                        switch (Number(el.operation)) {
                            case OPERATION.DELETE:
                                try {
                                    await this.egplNotesRepository.delete({ noteId: el.noteId });
                                    await this.egplNotesCDCRepository.delete(el);
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.INSERT:
                                try {
                                    await this.egplNotesRepository.insert(el);
                                    await this.egplNotesCDCRepository.delete(el);
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                                break;
                            case OPERATION.UPDATE:
                                try {
                                    await this.egplNotesRepository.update({ noteId: el.noteId }, el);
                                    await this.egplNotesCDCRepository.delete(el);
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
        this._egplNoteJob.start();
    }

    onModuleDestroy() {
        this._egplNoteJob.stop();
    }
}
