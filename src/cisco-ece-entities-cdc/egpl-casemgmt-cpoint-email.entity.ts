import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cdc.dbo_EGPL_CASEMGMT_CPOINT_EMAIL_CT' })
export class egplCasemgmtCpointEmailCDCEntity {
    @PrimaryColumn({ name: 'CONTACT_POINT_ID' })
    contactPointId: number;

    @Column({ nullable: false, name: 'DEPARTMENT_ID' })
    departmentId: number;

    @Column({ nullable: false, name: 'EMAIL_ADDRESS' })
    emailAddress: number;

    @Column({ nullable: true, name: 'WHENMODIFIED' })
    whenModified: string;

    @PrimaryColumn({ name: '__$operation' })
    operation: string;

}