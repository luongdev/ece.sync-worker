import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'EGML_EMAIL_ATTACHMENT_LINK' })
export class egmlEmailAttachmentLinkEntity {
  @PrimaryColumn({ name: 'EMAIL_ID' })
  emailId: number;

  @PrimaryColumn({ nullable: false, name: 'EMAIL_ATTACHMENT_ID' })
  emailAttachmentId: number;

  @Column({ nullable: false, name: 'LINK_TYPE' })
  linkType: number;

}