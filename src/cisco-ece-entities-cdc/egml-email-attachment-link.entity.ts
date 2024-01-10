import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cdc.dbo_EGML_EMAIL_ATTACHMENT_LINK_CT' })
export class egmlEmailAttachmentLinkCDCEntity {
  @PrimaryColumn({ name: 'EMAIL_ID' })
  emailId: number;

  @PrimaryColumn({ nullable: false, name: 'EMAIL_ATTACHMENT_ID' })
  emailAttachmentId: number;

  @Column({ nullable: false, name: 'LINK_TYPE' })
  linkType: number;

  @PrimaryColumn({ name: '__$operation' })
  operation: string;

}