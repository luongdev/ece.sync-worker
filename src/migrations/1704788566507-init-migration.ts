import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1704788566507 implements MigrationInterface {
    name = 'InitMigration1704788566507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "EGML_EMAIL_DATA" ("EMAIL_ID" int NOT NULL, "ACTIVITY_ID" int NOT NULL, "HEADER" nvarchar(255) NOT NULL, "CONTENT" nvarchar(255) NOT NULL, "CONTENT_TYPE" nvarchar(255) NOT NULL, CONSTRAINT "PK_88299d3d225cfee8c35c91dfaa0" PRIMARY KEY ("EMAIL_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGML_EMAIL_ATTACHMENT" ("EMAIL_ATTACHMENT_ID" numeric NOT NULL, "FILE_NAME" nvarchar(255) NOT NULL, "CONTENT_TYPE" nvarchar(255) NOT NULL, "ATTACHMENT_SIZE" int NOT NULL, "ENCODING_TYPE" nvarchar(255), "CHARSET" nvarchar(255), "BLOCKED_FLAG" nvarchar(255), "CONTENT" binary, CONSTRAINT "PK_604476b8c6b77c1ea63c3075833" PRIMARY KEY ("EMAIL_ATTACHMENT_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGML_EMAIL_DATA_ALT" ("EMAIL_ID" int NOT NULL, "ACTIVITY_ID" int NOT NULL, "TEXT_CONTENT" nvarchar(255) NOT NULL, CONSTRAINT "PK_30feb2802383e9beef15e849130" PRIMARY KEY ("EMAIL_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGML_EMAIL_ATTACHMENT_LINK" ("EMAIL_ID" int NOT NULL, "EMAIL_ATTACHMENT_ID" int NOT NULL, "LINK_TYPE" int NOT NULL, CONSTRAINT "PK_86782c8df85e1fb1d8a2043ba31" PRIMARY KEY ("EMAIL_ID", "EMAIL_ATTACHMENT_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGML_EMAIL" ("EMAIL_ID" int NOT NULL, "ACTIVITY_ID" int NOT NULL, "ALIAS_ID" int NOT NULL, "SUBJECT" nvarchar(255) NOT NULL, "EMAIL_DATE" datetime NOT NULL, "EMAIL_SIZE" int NOT NULL, "NUM_ATTACHMENTS" int NOT NULL, "CHARSET" nvarchar(255), "MESSAGE_ID" nvarchar(255), "FROM_EMAIL_ADDRESS" nvarchar(255) NOT NULL, "RECV_EMAIL_ADDRESS" nvarchar(255) NOT NULL, "DELETE_FLAG" nvarchar(255) NOT NULL, CONSTRAINT "PK_18cc1720bec2797212839856f36" PRIMARY KEY ("EMAIL_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGPL_CASEMGMT_CASE_ASS" ("CASE_GROUP_ID" int NOT NULL, "CASE_ID" int NOT NULL, CONSTRAINT "PK_bed790918c879c75eab8aeb8b5d" PRIMARY KEY ("CASE_GROUP_ID", "CASE_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGML_EMAIL_ADDRESS" ("EMAIL_ID" int NOT NULL, "EMAIL_ADDRESS" nvarchar(255) NOT NULL, "ADDRESS_FLAG" int NOT NULL, CONSTRAINT "PK_204936969e279aed09dc7d56c5e" PRIMARY KEY ("EMAIL_ID", "EMAIL_ADDRESS", "ADDRESS_FLAG"))`);
        await queryRunner.query(`CREATE TABLE "EGPL_CASEMGMT_ACTIVITY" ("ACTIVITY_ID" int NOT NULL, "CASE_ID" int, "DEPARTMENT_ID" int, "ACTIVITY_MODE" int, "ACTIVITY_TYPE" int NOT NULL, "ACTIVITY_SUB_TYPE" int NOT NULL, "ACTIVITY_STATUS" int NOT NULL, "ACTIVITY_SUB_STATUS" int NOT NULL, "ACTIVITY_PRIORITY" int, "WHEN_CREATED" datetime NOT NULL, "WHO_CREATED" int NOT NULL, "WHEN_MODIFIED" datetime, "DUE_DATE" datetime, "USER_LAST_WORKED" int, "ASSIGNED_TO" int, "SUBJECT" nvarchar(255), "DESCRIPTION" nvarchar(255), "LANGUAGE_ID" int, "CUSTOMER_ID" int, "CONTACT_PERSON_ID" int, "QUEUE_ID" int, "CONTACT_POINT_ID" int, "CONTACT_POINT_DATA" nvarchar(255), "LAST_ACTION_REASON" nvarchar(255), "PINNED" nvarchar(255) NOT NULL, "LOCKED" nvarchar(255) NOT NULL, "ACTIVITY_ACCESS" int NOT NULL, "FOLDER_ID" int, "LAST_DEPARTMENT_ID" int, "SAVE_DRAFT_FLAG" int NOT NULL, "LEAVE_OPEN_FLAG" int, "NUM_NOTES" int, "NUM_ATTACHMENTS" int, "CASE_TYPE" int, "DELETE_FLAG" nvarchar(255) NOT NULL, "CONFERENCE_FLAG" nvarchar(255), "IS_ESCALATED" nvarchar(255), "OUTBOUND_FAILED" int NOT NULL, "VISITOR_SESSION_ID" nvarchar(255), "VISITOR_USER_ID" nvarchar(255), "CUST_ACCOUNT_ID" nvarchar(255), "DELAY_TIME_IN_MIN" int, "ISSUE_TYPE_ID" int, CONSTRAINT "PK_a75d0c25179a49eadc15796c97f" PRIMARY KEY ("ACTIVITY_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGPL_EVENT_HISTORY_CASE_MGMT" ("EVENT_ID" int NOT NULL, "EVENT_DATE" int NOT NULL, "DATE_KEY" int, "TIME_KEY" int, "APPLICATION_ID" int, "LANGUAGE_ID" int, "OBJECT_OPERATION" int, "EVENT_DURATION" int, "USER_ID" int, "SESSION_ID" int, "DEPARTMENT_ID" int, "REASON" int, "REASON1" int, "REASON2" int, "REASON3" int, "REASON4" int, "REASON5" int, "OBJECT_TYPE" int, "QUEUE_ID" int, "ENTRY_POINT_ID" int, "SOURCE_ACTIVITY_ID" int, "CASE_ID" int, "ACTIVITY_ID" int, "TOP_LVL_ACTIVITY_ID" int, "CUSTOMER_ID" int, "RULE_ID" int, "CLIENT_IP" nvarchar(255), "EVENT_JSON_DATA" nvarchar(255), "CREATE_DATE" datetime NOT NULL, "UPDATE_VERSION" datetime NOT NULL, CONSTRAINT "PK_95d7a8096fb25ad32d0307369e2" PRIMARY KEY ("EVENT_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGPL_CASEMGMT_CASE" ("CASE_ID" int NOT NULL, "CASE_STATUS" nvarchar(255) NOT NULL, "CASE_GROUP_ID" int, "DEPARTMENT_ID" int NOT NULL, "ORIGINAL_SOURCE" nvarchar(255) NOT NULL, "WHEN_CREATED" datetime NOT NULL, "WHO_CREATED" int NOT NULL, "WHO_MODIFIED" int, "WHEN_MODIFIED" datetime, "DUE_DATE" datetime, "OWNER" int NOT NULL, "CUSTOMER_ID" int, "SEVERITY" int NOT NULL, "SUBJECT" nvarchar(255), "CASE_ACCESS" int NOT NULL, "DESCRIPTION" nvarchar(255), "SOLUTION_DESCRIPTION" nvarchar(255), "FOLDER_ID" int, "USER_LAST_WORKED" int, "DELETE_FLAG" nvarchar(255) NOT NULL, CONSTRAINT "PK_49f2e2c0a34080a8e407f5350d9" PRIMARY KEY ("CASE_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGPL_CASEMGMT_CONTACT_POINT" ("CONTACT_POINT_ID" int NOT NULL, "CONTACT_PERSON_ID" int, "CONTACT_POINT_TYPE" int, "CUSTOMER_ID" int, "PRIORITY" int NOT NULL, "START_DATE" int NOT NULL, "END_DATE" int NOT NULL, "DELETE_FLAG" int NOT NULL, "DEPARTMENT_ID" int, "AUTO_PROVISIONED" datetime NOT NULL, CONSTRAINT "PK_e1f5fc0689491946a918b8c9b10" PRIMARY KEY ("CONTACT_POINT_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGPL_CASEMGMT_CPOINT_EMAIL" ("CONTACT_POINT_ID" int NOT NULL, "DEPARTMENT_ID" int NOT NULL, "EMAIL_ADDRESS" int NOT NULL, "WHENMODIFIED" nvarchar(255), CONSTRAINT "PK_29e97d31149ceb80490388fe703" PRIMARY KEY ("CONTACT_POINT_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGPL_DEPARTMENT" ("DEPARTMENT_ID" int NOT NULL, "DEPARTMENT_NAME" nvarchar(255) NOT NULL, "DEPARTMENT_DESC" nvarchar(255) NOT NULL, "DELETE_FLAG" nvarchar(255), CONSTRAINT "PK_2361a607bad3dc6f9ea28b44494" PRIMARY KEY ("DEPARTMENT_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGPL_CASEMGMT_CUSTOMER" ("CUSTOMER_ID" int NOT NULL, "CUSTOMER_TYPE" nvarchar(255) NOT NULL, "CUSTOMER_ROLE" nvarchar(255), "REFERRED_BY" int NOT NULL, "CLASSIFICATION" nvarchar(255) NOT NULL, "PIN_INFO" datetime NOT NULL, "HOW_CREATED" int NOT NULL, "WHO_CREATED" int, "WHEN_CREATED" datetime, "HOW_REFERRED" nvarchar(255), "INDUSTRY" nvarchar(255) NOT NULL, "MKTG_SEG" nvarchar(255), "ROLE" int NOT NULL, "SLA" nvarchar(255), "ENTITLEMENTS" nvarchar(255) NOT NULL, "PREFERED_AGENT_ID" int, "DEPARTMENT_ID" int, "DELETE_FLAG" nvarchar(255), "ARCHIVE_FLAG" int, "CREATE_DATE" datetime NOT NULL, "UPDATE_VERSION" datetime NOT NULL, "WHEN_MODIFIED" datetime NOT NULL, CONSTRAINT "PK_8bd9792e572b3892b6c0dd49d75" PRIMARY KEY ("CUSTOMER_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGPL_NOTES" ("NOTE_ID" int NOT NULL, "NOTE_OF_ID" int, "NOTE_OF_ID_TEMP" int, "NOTE_NAME" nvarchar(255), "NOTE_TYPE" nvarchar(255) NOT NULL, "NOTE_ACCESS" nvarchar(255) NOT NULL, "NOTE_DATA" nvarchar(255), "WHO_CREATED" int NOT NULL, "WHEN_CREATED" datetime NOT NULL, "DELETE_FLAG" nvarchar(255) NOT NULL, "PARENT_NOTE_ID" int, CONSTRAINT "PK_6885dd7b648e91da782aea4f36c" PRIMARY KEY ("NOTE_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGPL_ROUTING_QUEUE" ("QUEUE_ID" int NOT NULL, "QUEUE_NAME" nvarchar(255) NOT NULL, "QUEUE_STATE" int NOT NULL, "DEPARTMENT_ID" int NOT NULL, "QUEUE_TYPE" int NOT NULL, "QUEUE_ROUTING_TYPE" int NOT NULL, "QUEUE_CHAT_ROUTING_TYPE" int NOT NULL, "QUEUE_SKILL_FLAG" int, "WHO_CREATED" int, "WHEN_CREATED" datetime NOT NULL, "WHO_MODIFIED" int, "QUEUE_DESCRIPTION" nvarchar(255), "QUEUE_LINK" int, "QUEUE_ROUNDROBIN_INDEX" int, "QUEUE_LEVEL_1_AGE_TIME" int, "QUEUE_LEVEL_2_AGE_TIME" int, "QUEUE_LEVEL_3_AGE_TIME" int, "QUEUE_PRIORITY" int, "QUEUE_PUSH_FLAG" int, "CHAT_DEFAULT_TRANSFER_QUEUE" int, "DEFAULT_KB_FOLDER" int, "DEFAULT_SOSIAL_QUEUE" int NOT NULL, "SOSIAL_ROUTING_TYPE" int NOT NULL, "MAX_CHAT_QUEUE_DEPTH" int NOT NULL, "CHAT_QUEUE_PRIORITY" int NOT NULL, "CHAT_ALTERNATE_ENGAGEMENT" int NOT NULL, CONSTRAINT "PK_787013abb9b9fcb687d7b5f2648" PRIMARY KEY ("QUEUE_ID"))`);
        await queryRunner.query(`CREATE TABLE "EGPL_USER" ("USER_ID" int NOT NULL, "SALUTATION" nvarchar(255), "FIRST_NAME" nvarchar(255), "FIRST_NAME_FURIGAMA" nvarchar(255), "MIDDLE_NAME" nvarchar(255), "MIDDLE_NAME_FURIGAMA" nvarchar(255), "LAST_NAME" nvarchar(255), "LAST_NAME_FURIGAMA" nvarchar(255), "SUFFIX" nvarchar(255), "USER_NAME" nvarchar(255) NOT NULL, "PASSWORD" nvarchar(255), "CASE_INSENSITIVE" nvarchar(255), "LANGUAGE_PREFERENCE" nvarchar(255), "SCREEN_NAME" nvarchar(255), "MANAGER_ID" int, "EMAIL_ADDRESS_PRIMARY" nvarchar(255), "EMAIL_ADDRESS_SECONDARY" nvarchar(255), "LOGIN_LOGOUT_TIME" datetime, "NUM_OF_UNS_ATTEMPTS" int, "FORCE_PASSWORD_CHANGE" int, "PASSWORD_CHANGE_DATE" datetime, "WHEN_CREATED" datetime NOT NULL, "WHO_CREATED" int NOT NULL, "DELETE_FLAG" nvarchar(255) NOT NULL, "USER_STATE" int NOT NULL, "ACD_NAME" nvarchar(255), "FIRST_UNS_ATTEMPT_TIME" datetime, "NUM_OF_UNS_TIMED_ATTEMPTS" int, "ACD_EXTENSION" int, "SYS_USER" int, "MUTABLE_USER" int, "WHO_MODIFIED" int, "WHEN_MODIFIED" datetime, "DEPARTMENT_ID" int NOT NULL, "HIRE_DATE" datetime, "USER_TYPE" int, "EXTERNAL_ASSIGNMENT" nvarchar(255), "LOGIN_IP" nvarchar(255), "DEFAULT_CONTENT_LANG_ID" int, "CONTENT_LANGUAGE" int, "AUTHENTICATION_TYPE" int NOT NULL, CONSTRAINT "PK_d710ed23cfe51e284e315d8d9cb" PRIMARY KEY ("USER_ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "EGPL_USER"`);
        await queryRunner.query(`DROP TABLE "EGPL_ROUTING_QUEUE"`);
        await queryRunner.query(`DROP TABLE "EGPL_NOTES"`);
        await queryRunner.query(`DROP TABLE "EGPL_CASEMGMT_CUSTOMER"`);
        await queryRunner.query(`DROP TABLE "EGPL_DEPARTMENT"`);
        await queryRunner.query(`DROP TABLE "EGPL_CASEMGMT_CPOINT_EMAIL"`);
        await queryRunner.query(`DROP TABLE "EGPL_CASEMGMT_CONTACT_POINT"`);
        await queryRunner.query(`DROP TABLE "EGPL_CASEMGMT_CASE"`);
        await queryRunner.query(`DROP TABLE "EGPL_EVENT_HISTORY_CASE_MGMT"`);
        await queryRunner.query(`DROP TABLE "EGPL_CASEMGMT_ACTIVITY"`);
        await queryRunner.query(`DROP TABLE "EGML_EMAIL_ADDRESS"`);
        await queryRunner.query(`DROP TABLE "EGPL_CASEMGMT_CASE_ASS"`);
        await queryRunner.query(`DROP TABLE "EGML_EMAIL"`);
        await queryRunner.query(`DROP TABLE "EGML_EMAIL_ATTACHMENT_LINK"`);
        await queryRunner.query(`DROP TABLE "EGML_EMAIL_DATA_ALT"`);
        await queryRunner.query(`DROP TABLE "EGML_EMAIL_ATTACHMENT"`);
        await queryRunner.query(`DROP TABLE "EGML_EMAIL_DATA"`);
    }

}