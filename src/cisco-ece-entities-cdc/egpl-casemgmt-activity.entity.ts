import {
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "cdc.dbo_EGPL_CASEMGMT_ACTIVITY_CT" })
export class egplCasemgmtActivityCDCEntity {
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

  @PrimaryColumn({ name: '__$operation' })
  operation: number;

  @PrimaryColumn({ name: '__$start_lsn' })
  startLSN: Buffer;

  @PrimaryColumn({ name: '__$seqval' })
  seqVal: Buffer;

  @PrimaryColumn({ name: '__$command_id' })
  commandId: number;
}
