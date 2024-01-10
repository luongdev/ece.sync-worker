import {
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "cdc.dbo_EGPL_CASEMGMT_CUSTOMER" })
export class egplCasemgmtCustomerEntity {
  @PrimaryColumn({ name: "CUSTOMER_ID" })
  customerId: number;

  @Column({ nullable: false, name: "CUSTOMER_TYPE" })
  customerType: string;

  @Column({ nullable: true, name: "CUSTOMER_ROLE" })
  customerRole: string;

  @Column({ nullable: false, name: "REFERRED_BY" })
  referredBy: number;

  @Column({ nullable: false, name: "CLASSIFICATION" })
  classification: string;

  @Column({ nullable: false, name: "PIN_INFO" })
  pinInfo: Date;

  @Column({ nullable: false, name: "HOW_CREATED" })
  howCreated: number;

  @Column({ nullable: true, name: "WHO_CREATED" })
  whoCreated: number;

  @Column({ nullable: true, name: "WHEN_CREATED" })
  whenCreated: Date;

  @Column({ nullable: true, name: "HOW_REFERRED" })
  howReferred: string;

  @Column({ nullable: false, name: "INDUSTRY" })
  industry: string;

  @Column({ nullable: true, name: "MKTG_SEG" })
  mktgSeg: string;

  @Column({ nullable: false, name: "ROLE" })
  role: number;

  @Column({ nullable: true, name: "SLA" })
  sla: string;

  @Column({ nullable: false, name: "ENTITLEMENTS" })
  entitlements: string;

  @Column({ nullable: true, name: "PREFERED_AGENT_ID" })
  preferedAgentId: number;

  @Column({ nullable: true, name: "DEPARTMENT_ID" })
  departmentId: number;

  @Column({ nullable: true, name: "DELETE_FLAG" })
  deleteFlag: string;

  @Column({ nullable: true, name: "ARCHIVE_FLAG" })
  archiveFlag: number;

  @Column({ nullable: false, name: "CREATE_DATE" })
  createDate: Date;

  @Column({ nullable: false, name: "UPDATE_VERSION" })
  updateVersion: Date;

  @Column({ nullable: false, name: "WHEN_MODIFIED" })
  whenModified: Date;
}
