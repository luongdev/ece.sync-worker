import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { egplCasemgmtActivity } from "./egpl-casemgmt-activity.entity";
import { egplUserEntity } from "./egpl-user.entity";
import { egplNotesEntity } from "./egpl-notes.entity";
import { egplCasemgmtCaseAssEntity } from "./egpl_casemgmt_case_ass.entity";
import { egplCasemgmtCustomerEntity } from "./egpl-casemgmt-customer";

@Entity({ name: "EGPL_CASEMGMT_CASE" })
export class egplCasemgmtCaseEntity {
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

  @OneToOne(() => egplCasemgmtActivity, (activity) => activity.case)
  @JoinColumn({ name: "CASE_ID", referencedColumnName: "caseId" })
  activity: egplCasemgmtActivity;

  @OneToOne(() => egplUserEntity, (user) => user.case)
  @JoinColumn({ name: "OWNER", referencedColumnName: "userId" })
  ownerDetail: egplUserEntity;

  @OneToMany(() => egplNotesEntity, (note) => note.case)
  @JoinColumn({ name: "CASE_ID", referencedColumnName: "noteOfId" })
  notes: egplNotesEntity[];

  @OneToMany(() => egplCasemgmtCaseAssEntity, (caseAss) => caseAss.case)
  @JoinColumn({ name: "CASE_ID", referencedColumnName: "caseId" })
  caseAss: egplCasemgmtCaseAssEntity[];

  @OneToOne(() => egplCasemgmtCustomerEntity , (cus) => cus.case)
  @JoinColumn({ name: "CUSTOMER_ID", referencedColumnName: "customerId" })
  customer : egplCasemgmtCustomerEntity;
  
}
