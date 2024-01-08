import {
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
  PrimaryColumn,
  Column,
} from "typeorm";
import { egplCasemgmtActivity } from "./egpl-casemgmt-activity.entity";
import { egplUserEntity } from "./egpl-user.entity";

@Entity({ name: "EGPL_EVENT_HISTORY_CASE_MGMT" })
export class egplEventHistoryCaseMgmtEntity {
  @PrimaryColumn({ name: "EVENT_ID" })
  eventId: number;

  @Column({ nullable: false, name: "EVENT_DATE" })
  eventDate: number;

  @Column({ nullable: true, name: "DATE_KEY" })
  dateKey: number;

  @Column({ nullable: true, name: "TIME_KEY" })
  timeKey: number;

  @Column({ nullable: true, name: "APPLICATION_ID" })
  applicationId: number;

  @Column({ nullable: true, name: "LANGUAGE_ID" })
  languageId: number;

  @Column({ nullable: true, name: "OBJECT_OPERATION" })
  objectOperation: number;

  @Column({ nullable: true, name: "EVENT_DURATION" })
  eventDuration: number;

  @Column({ nullable: true, name: "USER_ID" })
  userId: number;

  @Column({ nullable: true, name: "SESSION_ID" })
  sessionId: number;

  @Column({ nullable: true, name: "DEPARTMENT_ID" })
  departmentId: number;

  @Column({ nullable: true, name: "REASON" })
  reasion: number;

  @Column({ nullable: true, name: "REASON1" })
  reasion1: number;

  @Column({ nullable: true, name: "REASON2" })
  reasion2: number;

  @Column({ nullable: true, name: "REASON3" })
  reasion3: number;

  @Column({ nullable: true, name: "REASON4" })
  reasion4: number;

  @Column({ nullable: true, name: "REASON5" })
  reasion5: number;

  @Column({ nullable: true, name: "OBJECT_TYPE" })
  objectType: number;

  @Column({ nullable: true, name: "QUEUE_ID" })
  queueId: number;

  @Column({ nullable: true, name: "ENTRY_POINT_ID" })
  entryPointId: number;

  @Column({ nullable: true, name: "SOURCE_ACTIVITY_ID" })
  sourceActivityId: number;

  @Column({ nullable: true, name: "CASE_ID" })
  caseId: number;

  @Column({ nullable: true, name: "ACTIVITY_ID" })
  activityId: number;

  @Column({ nullable: true, name: "TOP_LVL_ACTIVITY_ID" })
  topLvlActivityId: number;

  @Column({ nullable: true, name: "CUSTOMER_ID" })
  customerId: number;

  @Column({ nullable: true, name: "RULE_ID" })
  ruleId: number;

  @Column({ nullable: true, name: "CLIENT_IP" })
  clientIp: string;

  @Column({ nullable: true, name: "EVENT_JSON_DATA" })
  eventJsonData: string;

  @Column({ nullable: false, name: "CREATE_DATE" })
  createDate: Date;

  @Column({ nullable: false, name: "UPDATE_VERSION" })
  updateVersion: Date;

  @ManyToOne(() => egplCasemgmtActivity, (c) => c.historyActivity)
  @JoinColumn({ name: "ACTIVITY_ID", referencedColumnName: "activityId" })
  activity: egplCasemgmtActivity;

  @OneToOne(() => egplUserEntity, (user) => user.hCase)
  @JoinColumn({ name: "USER_ID", referencedColumnName: "userId" })
  user: egplUserEntity;
}
