import {
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "cdc.dbo_EGPL_CASEMGMT_CASE_CT" })
export class egplCasemgmtCaseCDCEntity {
  @PrimaryColumn({ name: "CASE_ID" })
  caseId: number;

  @Column({ nullable: false, name: "CASE_STATUS" })
  caseStatus: string;

  @Column({ nullable: true, name: "CASE_GROUP_ID" })
  caseGroupId: number;

  @Column({ nullable: false, name: "DEPARTMENT_ID" })
  departmentId: number;

  @Column({ nullable: false, name: "ORIGINAL_SOURCE" })
  originalSource: string;

  @Column({ nullable: false, name: "WHEN_CREATED" })
  whenCreated: Date;

  @Column({ nullable: false, name: "WHO_CREATED" })
  whoCreated: number;

  @Column({ nullable: true, name: "WHO_MODIFIED" })
  whoModified: number;

  @Column({ nullable: true, name: "WHEN_MODIFIED" })
  whenModified: Date;

  @Column({ nullable: true, name: "DUE_DATE" })
  dueDate: Date;

  @Column({ nullable: false, name: "OWNER" })
  owner: number;

  @Column({ nullable: true, name: "CUSTOMER_ID" })
  customerId: number;

  @Column({ nullable: false, name: "SEVERITY" })
  severity: number;

  @Column({ nullable: true, name: "SUBJECT" })
  subject: string;

  @Column({ nullable: false, name: "CASE_ACCESS" })
  caseAccess: number;

  @Column({ nullable: true, name: "DESCRIPTION" })
  description: string;

  @Column({ nullable: true, name: "SOLUTION_DESCRIPTION" })
  solutionDescription: string;

  @Column({ nullable: true, name: "FOLDER_ID" })
  folderId: number;

  @Column({ nullable: true, name: "USER_LAST_WORKED" })
  userLastWorked: number;

  @Column({ nullable: false, name: "DELETE_FLAG" })
  deleteFlag: string;

  @PrimaryColumn({ name: '__$operation' })
  operation: string;

}
