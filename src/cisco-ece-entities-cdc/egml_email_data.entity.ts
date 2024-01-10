import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cdc.dbo_EGML_EMAIL_DATA' })
export class egmlEmailDataEntity {
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
}