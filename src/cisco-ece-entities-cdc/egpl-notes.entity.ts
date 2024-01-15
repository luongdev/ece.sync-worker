import {
  Binary,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "cdc.dbo_EGPL_NOTES_CT" })
export class egplNotesCDCEntity {
  @PrimaryColumn({ name: "NOTE_ID" })
  noteId: number;

  @Column({ nullable: true, name: "NOTE_OF_ID" })
  noteOfId: number;

  @Column({ nullable: true, name: "NOTE_OF_ID_TEMP" })
  noteOfIdTemp: number;

  @Column({ nullable: true, name: "NOTE_NAME" })
  noteName: string;

  @Column({ nullable: false, name: "NOTE_TYPE" })
  noteType: string;

  @Column({ nullable: false, name: "NOTE_ACCESS" })
  noteAccess: string;

  @Column({ nullable: true, name: "NOTE_DATA" })
  noteData: string;

  @Column({ nullable: false, name: "WHO_CREATED" })
  whoCreated: number;

  @Column({ nullable: false, name: "WHEN_CREATED" })
  whenCreated: Date;

  @Column({ nullable: false, name: "DELETE_FLAG" })
  deleteFlag: string;

  @Column({ nullable: true, name: "PARENT_NOTE_ID" })
  parentNoteId: number;

  @PrimaryColumn({ name: '__$operation' })
  operation: number;

  @PrimaryColumn({ name: '__$start_lsn' })
  startLSN: Buffer;

  @PrimaryColumn({ name: '__$seqval' })
  seqVal: Buffer;

  @PrimaryColumn({ name: '__$command_id' })
  commandId: number;
}
