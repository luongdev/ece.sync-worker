import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cdc.dbo_EGML_EMAIL_DATA_CT' })
export class egmlEmailDataCDCEntity {
    @PrimaryColumn({ name: 'EMAIL_ID' })
    emailId: number;

    @Column({ nullable: false, name: 'ACTIVITY_ID' })
    activityId: number;

    @Column({ nullable: false, name: 'HEADER' })
    header: string;

    @Column({ nullable: false, name: 'CONTENT' })
    content: string;

    @Column({ nullable: false, name: 'CONTENT_TYPE' })
    contentType: string;

    @PrimaryColumn({ name: '__$operation' })
    operation: number;

    @PrimaryColumn({ name: '__$start_lsn' })
    startLSN: Buffer;

    @PrimaryColumn({ name: '__$seqval' })
    seqVal: Buffer;

    @PrimaryColumn({ name: '__$command_id' })
    commandId: number;
}