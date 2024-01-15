import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cdc.dbo_EGPL_CASEMGMT_CONTACT_POINT_CT' })
export class egplCasemgmtContactPointCDCEntity {
    @PrimaryColumn({ name: 'CONTACT_POINT_ID' })
    contactPointId: number;

    @Column({ nullable: true, name: 'CONTACT_PERSON_ID' })
    contactPersonId: number;

    @Column({ nullable: true, name: 'CONTACT_POINT_TYPE' })
    contactPointType: number;

    @Column({ nullable: true, name: 'CUSTOMER_ID' })
    customerId: number;

    @Column({ nullable: false, name: 'PRIORITY' })
    priority: number;

    @Column({ nullable: false, name: 'START_DATE' })
    startDate: number;

    @Column({ nullable: false, name: 'END_DATE' })
    endDate: number;

    @Column({ nullable: false, name: 'DELETE_FLAG' })
    deleteFlag: number;

    @Column({ nullable: true, name: 'DEPARTMENT_ID' })
    departmentId: number;

    @Column({ nullable: false, name: 'AUTO_PROVISIONED' })
    autoProvisioned: Date;

    @PrimaryColumn({ name: '__$operation' })
    operation: number;

    @PrimaryColumn({ name: '__$start_lsn' })
    startLSN: Buffer;

    @PrimaryColumn({ name: '__$seqval' })
    seqVal: Buffer;

    @PrimaryColumn({ name: '__$command_id' })
    commandId: number;
}