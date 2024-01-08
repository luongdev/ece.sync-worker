import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { egmlEmailAttachmentLinkEntity } from './egml-email-attachment-link.entity';

@Entity({ name: 'EGML_EMAIL_ATTACHMENT' })
export class egmlEmailAttachmentEntity {
  @PrimaryColumn({ type: 'numeric', name: 'EMAIL_ATTACHMENT_ID' })
  id: number;

  @Column({ nullable: false, name: 'FILE_NAME' })
  fileName: string;

  @Column({ nullable: false, name: 'CONTENT_TYPE' })
  contentType: string;

  @Column({ nullable: false, name: 'ATTACHMENT_SIZE' })
  attachmentSize: number;

  @Column({ nullable: true, name: 'ENCODING_TYPE' })
  encodingType: string;

  @Column({ nullable: true, name: 'CHARSET' })
  charset: string;

  @Column({ nullable: true, name: 'BLOCKED_FLAG' })
  blockedFlag: string;

  @Column({ nullable: true, name: 'CONTENT' })
  content: Buffer;

  @OneToOne(() => egmlEmailAttachmentLinkEntity, (aml) => aml.attachment)
  @JoinColumn({ name: 'EMAIL_ATTACHMENT_ID', referencedColumnName: 'emailAttachmentId' })
  attachmentLink: egmlEmailAttachmentLinkEntity;
}