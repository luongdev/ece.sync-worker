import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "EGPL_CASEMGMT_CASE_ASS" })
export class egplCasemgmtCaseAssEntity {
  @PrimaryColumn({ name: "CASE_GROUP_ID" })
  caseGroupId: number;

  @PrimaryColumn({ name: "CASE_ID" })
  caseId: number;

}
