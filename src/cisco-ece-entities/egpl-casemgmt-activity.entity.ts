import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { egmlEmailEntity } from "./egml-email.entity";
import { egplUserEntity } from "./egpl-user.entity";
import { egplRoutingQueueEntity } from "./egpl-routing-queue.entity";
import { egmlEmailDataAltEntity } from "./egml-email-data-alt.entity";
import { egplCasemgmtCaseEntity } from "./egpl-casemgmt-case.entity";
import { egplDepartmentEntity } from "./egpl-department.entity";
import { egplCasemgmtCpointEmailEntity } from "./egpl-casemgmt-cpoint-email.entity";
import { egmlEmailDataEntity } from "./egml_email_data.entity";
import { egplNotesEntity } from "./egpl-notes.entity";
import { egplEventHistoryCaseMgmtEntity } from "./egpl_event_history_case_mgmt.entity";
import { egplCasemgmtCustomerEntity } from "./egpl-casemgmt-customer";

@Entity({ name: "EGPL_CASEMGMT_ACTIVITY_9000" })
export class egplCasemgmtActivity {
  @PrimaryColumn({ name: "ACTIVITY_ID" })
  activityId: number;

  @Column({ nullable: true, name: "CASE_ID" })
  caseId: number;

  @Column({ nullable: true, name: "DEPARTMENT_ID" })
  departmentId: number;

  @Column({ nullable: true, name: "ACTIVITY_MODE" })
  activityMode: number;

  @Column({ nullable: false, name: "ACTIVITY_TYPE" })
  activityType: number;

  @Column({ nullable: false, name: "ACTIVITY_SUB_TYPE" })
  activitySubType: number;

  @Column({ nullable: false, name: "ACTIVITY_STATUS" })
  activityStatus: number;

  @Column({ nullable: false, name: "ACTIVITY_SUB_STATUS" })
  activitySubStatus: number;

  @Column({ nullable: true, name: "ACTIVITY_PRIORITY" })
  activityPriority: number;

  @Column({ nullable: false, name: "WHEN_CREATED" })
  createdOn: Date;

  @Column({ nullable: false, name: "WHO_CREATED" })
  whoCreated: number;

  @Column({ nullable: true, name: "WHEN_MODIFIED" })
  whenModified: Date;

  @Column({ nullable: true, name: "DUE_DATE" })
  dueDate: Date;

  @Column({ nullable: true, name: "USER_LAST_WORKED" })
  userLastWorked: number;

  @Column({ nullable: true, name: "ASSIGNED_TO" })
  assignedTo: number;

  @Column({ nullable: true, name: "SUBJECT" })
  subject: string;

  @Column({ nullable: true, name: "DESCRIPTION" })
  description: string;

  @Column({ nullable: true, name: "LANGUAGE_ID" })
  languageId: number;

  @Column({ nullable: true, name: "CUSTOMER_ID" })
  customerId: number;

  @Column({ nullable: true, name: "CONTACT_PERSON_ID" })
  contactPersonId: number;

  @Column({ nullable: true, name: "QUEUE_ID" })
  queueId: number;

  @Column({ nullable: true, name: "CONTACT_POINT_ID" })
  contactPointId: number;

  @Column({ nullable: true, name: "CONTACT_POINT_DATA" })
  contactPointData: string;

  @Column({ nullable: true, name: "LAST_ACTION_REASON" })
  lastActionReason: string;

  @Column({ nullable: false, name: "PINNED" })
  pinned: string;

  @Column({ nullable: false, name: "LOCKED" })
  locked: string;

  @Column({ nullable: false, name: "ACTIVITY_ACCESS" })
  activityAccess: number;

  @Column({ nullable: true, name: "FOLDER_ID" })
  folderId: number;

  @Column({ nullable: true, name: "LAST_DEPARTMENT_ID" })
  lastDepartmentId: number;

  @Column({ nullable: false, name: "SAVE_DRAFT_FLAG" })
  saveDraftFlag: number;

  @Column({ nullable: true, name: "LEAVE_OPEN_FLAG" })
  leaveOpenFlag: number;

  @Column({ nullable: true, name: "NUM_NOTES" })
  numNotes: number;

  @Column({ nullable: true, name: "NUM_ATTACHMENTS" })
  numAttachments: number;

  @Column({ nullable: true, name: "CASE_TYPE" })
  caseType: number;

  @Column({ nullable: false, name: "DELETE_FLAG" })
  deleteFlag: string;

  @Column({ nullable: true, name: "CONFERENCE_FLAG" })
  conferenceFlag: string;

  @Column({ nullable: true, name: "IS_ESCALATED" })
  isEscalated: string;

  @Column({ nullable: false, name: "OUTBOUND_FAILED" })
  outboundFailed: number;

  @Column({ nullable: true, name: "VISITOR_SESSION_ID" })
  visitorSessionId: string;

  @Column({ nullable: true, name: "VISITOR_USER_ID" })
  visitorUserId: string;

  @Column({ nullable: true, name: "CUST_ACCOUNT_ID" })
  custAccountId: string;

  @Column({ nullable: true, name: "DELAY_TIME_IN_MIN" })
  delayTimeInMin: number;

  @Column({ nullable: true, name: "ISSUE_TYPE_ID" })
  issueTypeId: number;

  @OneToOne(() => egmlEmailEntity, (email) => email.activity)
  @JoinColumn({ name: "ACTIVITY_ID", referencedColumnName: "activityId" })
  email: egmlEmailEntity;

  @OneToOne(() => egplUserEntity, (user) => user.activity)
  @JoinColumn({ name: "ASSIGNED_TO", referencedColumnName: "userId" })
  user: egplUserEntity;

  @OneToOne(() => egplRoutingQueueEntity, (queue) => queue.activity)
  @JoinColumn({ name: "QUEUE_ID", referencedColumnName: "queueId" })
  queue: egplRoutingQueueEntity;

  @OneToOne(() => egmlEmailDataAltEntity, (dataAlt) => dataAlt.activity)
  @JoinColumn({ name: "ACTIVITY_ID", referencedColumnName: "activityId" })
  emailDataAlt: egmlEmailDataAltEntity;

  @OneToOne(() => egplCasemgmtCaseEntity, (c) => c.activity)
  @JoinColumn({ name: "CASE_ID", referencedColumnName: "caseId" })
  case: egplCasemgmtCaseEntity;

  @OneToOne(() => egplDepartmentEntity, (dpmt) => dpmt.activity)
  @JoinColumn({ name: "DEPARTMENT_ID", referencedColumnName: "departmentId" })
  department: egplDepartmentEntity;

  @OneToOne(() => egplCasemgmtCpointEmailEntity, (cpoint) => cpoint.activity)
  @JoinColumn({
    name: "CONTACT_POINT_ID",
    referencedColumnName: "contactPointId",
  })
  contactPoint: egplCasemgmtCpointEmailEntity;

  @OneToOne(() => egmlEmailDataEntity, (data) => data.activity)
  @JoinColumn({ name: "ACTIVITY_ID", referencedColumnName: "activityId" })
  emailData: egmlEmailDataEntity;

  @OneToMany(() => egplNotesEntity, (note) => note.activity)
  @JoinColumn({ name: "ACTIVITY_ID", referencedColumnName: "noteOfId" })
  notes: egplNotesEntity[];

  @OneToMany(() => egplEventHistoryCaseMgmtEntity, (hCase) => hCase.activity)
  @JoinColumn({ name: "ACTIVITY_ID", referencedColumnName: "activityId" })
  historyActivity: egplEventHistoryCaseMgmtEntity[];


  @OneToOne(() => egplCasemgmtCustomerEntity , (cus) => cus.activity)
  @JoinColumn({ name: "CUSTOMER_ID", referencedColumnName: "customerId" })
  customer : egplCasemgmtCustomerEntity;
}
