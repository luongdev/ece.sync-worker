import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cdc.dbo_EGML_EMAIL_DATA_ALT' })
export class egmlEmailDataAltEntity {
  @PrimaryColumn({ name: 'EMAIL_ID' })
  emailId: number;

  @Column({ nullable: false, name: 'ACTIVITY_ID' })
  activityId: number;

  @Column({ nullable: false, name: 'TEXT_CONTENT' })
  textContent: string;

}