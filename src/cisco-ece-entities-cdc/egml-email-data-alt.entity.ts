import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cdc.dbo_EGML_EMAIL_DATA_ALT_CT' })
export class egmlEmailDataAltCDCEntity {
  @PrimaryColumn({ name: 'EMAIL_ID' })
  emailId: number;

  @Column({ nullable: false, name: 'ACTIVITY_ID' })
  activityId: number;

  @Column({ nullable: false, name: 'TEXT_CONTENT' })
  textContent: string;

  @PrimaryColumn({ name: '__$operation' })
  operation: string;

}