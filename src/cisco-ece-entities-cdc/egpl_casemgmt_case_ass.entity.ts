import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "cdc.dbo_EGPL_CASEMGMT_CASE_ASS_CT" })
export class egplCasemgmtCaseAssCDCEntity {
  @PrimaryColumn({ name: "CASE_GROUP_ID" })
  caseGroupId: number;

  @PrimaryColumn({ name: "CASE_ID" })
  caseId: number;

  @PrimaryColumn({ name: '__$operation' })
  operation: string;
}
