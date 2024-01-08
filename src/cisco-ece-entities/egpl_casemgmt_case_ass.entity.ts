import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { egplCasemgmtCaseEntity } from "./egpl-casemgmt-case.entity";

@Entity({ name: "EGPL_CASEMGMT_CASE_ASS" })
export class egplCasemgmtCaseAssEntity {
  @PrimaryColumn({ name: "CASE_GROUP_ID" })
  caseGroupId: number;

  @PrimaryColumn({ name: "CASE_ID" })
  caseId: number;

  @OneToOne(() => egplCasemgmtCaseEntity, (c) => c.caseAss)
  @JoinColumn({ name: "CASE_ID", referencedColumnName: "caseId" })
  case: egplCasemgmtCaseEntity;
}
