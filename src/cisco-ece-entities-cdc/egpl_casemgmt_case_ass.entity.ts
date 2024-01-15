import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "cdc.dbo_EGPL_CASEMGMT_CASE_ASS_CT" })
export class egplCasemgmtCaseAssCDCEntity {
  @PrimaryColumn({ name: "CASE_GROUP_ID" })
  caseGroupId: number;

  @PrimaryColumn({ name: "CASE_ID" })
  caseId: number;

  @PrimaryColumn({ name: '__$operation' })
  operation: number;

  @PrimaryColumn({ name: '__$start_lsn' })
  startLSN: Buffer;

  @PrimaryColumn({ name: '__$seqval' })
  seqVal: Buffer;

  @PrimaryColumn({ name: '__$command_id' })
  commandId: number;
}
