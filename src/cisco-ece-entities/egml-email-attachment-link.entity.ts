import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { egmlEmailEntity } from './egml-email.entity';
import { egmlEmailAttachmentEntity } from './egml-email-attachment.entity';

@Entity({ name: 'EGML_EMAIL_ATTACHMENT_LINK' })
export class egmlEmailAttachmentLinkEntity {
  @PrimaryColumn({ name: 'EMAIL_ID' })
  emailId: number;

  @PrimaryColumn({ nullable: false, name: 'EMAIL_ATTACHMENT_ID' })
  emailAttachmentId: number;

  @Column({ nullable: false, name: 'LINK_TYPE' })
  linkType: number;

  @OneToOne(() => egmlEmailEntity, (email) => email.emailAttachmentLink)
  @JoinColumn({ name: 'EMAIL_ID', referencedColumnName: 'emailId' })
  email: egmlEmailEntity;

  @OneToOne(() => egmlEmailAttachmentEntity, (am) => am.attachmentLink)
  @JoinColumn({ name: 'EMAIL_ATTACHMENT_ID', referencedColumnName: 'id' })
  attachment: egmlEmailAttachmentEntity;
}