import {
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";
@Entity({ name: "cdc.dbo_EGPL_USER_CT" })
export class egplUserCDCEntity {
  @PrimaryColumn({ name: "USED_ID" })
  userId: number;

  @Column({ nullable: true, name: "SALUTATION" })
  salutation: string;

  @Column({ nullable: true, name: "FIRST_NAME" })
  firstName: string;

  @Column({ nullable: true, name: "FIRST_NAME_FURIGAMA" })
  firstNameFurigama: string;

  @Column({ nullable: true, name: "MIDDLE_NAME" })
  middleName: string;

  @Column({ nullable: true, name: "MIDDLE_NAME_FURIGAMA" })
  middleNameFurigama: string;

  @Column({ nullable: true, name: "LAST_NAME" })
  lastName: string;

  @Column({ nullable: true, name: "LAST_NAME_FURIGAMA" })
  lastNameFurigama: string;

  @Column({ nullable: true, name: "SUFFIX" })
  suffix: string;

  @Column({ nullable: false, name: "USER_NAME" })
  userName: string;

  @Column({ nullable: true, name: "PASSWORD" })
  password: string;

  @Column({ nullable: true, name: "CASE_INSENSITIVE" })
  caseInsensitive: string;

  @Column({ nullable: true, name: "LANGUAGE_PREFERENCE" })
  languagePreference: string;

  @Column({ nullable: true, name: "SCREEN_NAME" })
  screenName: string;

  @Column({ nullable: true, name: "MANAGER_ID" })
  managerId: number;

  @Column({ nullable: true, name: "EMAIL_ADDRESS_PRIMARY" })
  emailAddressPrimary: string;

  @Column({ nullable: true, name: "EMAIL_ADDRESS_SECONDARY" })
  emailAddressSecondary: string;

  @Column({ nullable: true, name: "LOGIN_LOGOUT_TIME" })
  loginLogoutTime: Date;

  @Column({ nullable: true, name: "NUM_OF_UNS_ATTEMPTS" })
  numOfUnsAttempts: number;

  @Column({ nullable: true, name: "FORCE_PASSWORD_CHANGE" })
  forcePasswordChange: number;

  @Column({ nullable: true, name: "PASSWORD_CHANGE_DATE" })
  passwordChangeDate: Date;

  @Column({ nullable: false, name: "WHEN_CREATED" })
  whenCreated: Date;

  @Column({ nullable: false, name: "WHO_CREATED" })
  whoCreated: number;

  @Column({ nullable: false, name: "DELETE_FLAG" })
  deleteFlag: string;

  @Column({ nullable: false, name: "USER_STATE" })
  userState: number;

  @Column({ nullable: true, name: "ACD_NAME" })
  acdName: string;

  @Column({ nullable: true, name: "FIRST_UNS_ATTEMPT_TIME" })
  firstUnsAttemptTime: Date;

  @Column({ nullable: true, name: "NUM_OF_UNS_TIMED_ATTEMPTS" })
  numOfUnsTimedAttempts: number;

  @Column({ nullable: true, name: "ACD_EXTENSION" })
  acdExtension: number;

  @Column({ nullable: true, name: "SYS_USER" })
  sysUser: number;

  @Column({ nullable: true, name: "MUTABLE_USER" })
  mutableUser: number;

  @Column({ nullable: true, name: "WHO_MODIFIED" })
  whoModified: number;

  @Column({ nullable: true, name: "WHEN_MODIFIED" })
  whenModified: Date;

  @Column({ nullable: false, name: "DEPARTMENT_ID" })
  departmentId: number;

  @Column({ nullable: true, name: "HIRE_DATE" })
  hireDate: Date;

  @Column({ nullable: true, name: "USER_TYPE" })
  userType: number;

  @Column({ nullable: true, name: "EXTERNAL_ASSIGNMENT" })
  externalAssignment: string;

  @Column({ nullable: true, name: "LOGIN_IP" })
  loginIp: string;

  @Column({ nullable: true, name: "DEFAULT_CONTENT_LANG_ID" })
  defaultContentLangId: number;

  @Column({ nullable: true, name: "CONTENT_LANGUAGE" })
  contentLanguage: number;

  @Column({ nullable: false, name: "AUTHENTICATION_TYPE" })
  authenticationType: number;

  @PrimaryColumn({ name: '__$operation' })
  operation: string;
}
