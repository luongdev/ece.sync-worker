import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cdc.dbo_EGML_EMAIL' })
export class egmlEmailEntity {
    @PrimaryColumn({ name: 'EMAIL_ID' })
    emailId: number;

    @Column({ nullable: false, name: 'ACTIVITY_ID' })
    activityId: number;

    @Column({ nullable: false, name: 'ALIAS_ID' })
    aliasId: number;

    @Column({ nullable: false, name: 'SUBJECT' })
    subject: string;

    @Column({ nullable: false, name: 'EMAIL_DATE' })
    emailDate: Date;

    @Column({ nullable: false, name: 'EMAIL_SIZE' })
    emailSize: number;

    @Column({ nullable: false, name: 'NUM_ATTACHMENTS' })
    numberAttachments: number;

    @Column({ nullable: true, name: 'CHARSET' })
    charset: string;

    @Column({ nullable: true, name: 'MESSAGE_ID' })
    messageId: string;

    @Column({ nullable: false, name: 'FROM_EMAIL_ADDRESS' })
    fromEmailAddress: string;

    @Column({ nullable: false, name: 'RECV_EMAIL_ADDRESS' })
    recvEmailAddress: string;

    @Column({ nullable: false, name: 'DELETE_FLAG' })
    deleteFlag: string;
};