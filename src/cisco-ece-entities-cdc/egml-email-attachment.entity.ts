import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cdc.dbo_EGML_EMAIL_ATTACHMENT_CT' })
export class egmlEmailAttachmentCDCEntity {
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

  @PrimaryColumn({ name: '__$operation' })
  operation: number;

  @PrimaryColumn({ name: '__$start_lsn' })
  startLSN: Buffer;

  @PrimaryColumn({ name: '__$seqval' })
  seqVal: Buffer;

  @PrimaryColumn({ name: '__$command_id' })
  commandId: number;
}