import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { egplCasemgmtActivity } from './egpl-casemgmt-activity.entity';

@Entity({ name: 'EGML_EMAIL_DATA_ALT' })
export class egmlEmailDataAltEntity {
  @PrimaryColumn({ name: 'EMAIL_ID' })
  emailId: number;

  @Column({ nullable: false, name: 'ACTIVITY_ID' })
  activityId: number;

  @Column({ nullable: false, name: 'TEXT_CONTENT' })
  textContent: string;

  @OneToOne(() => egplCasemgmtActivity, (activity) => activity.emailDataAlt)
  @JoinColumn({ name: 'ACTIVITY_ID', referencedColumnName: 'activityId' })
  activity: egplCasemgmtActivity;
}