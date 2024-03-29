import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cdc.dbo_EGPL_DEPARTMENT_CT' })
export class egplDepartmentCDCEntity {
    @PrimaryColumn({ name: 'DEPARTMENT_ID' })
    departmentId: number;

    @Column({ nullable: false, name: 'DEPARTMENT_NAME' })
    departmentName: string;

    @Column({ nullable: false, name: 'DEPARTMENT_DESC' })
    departmentDesc: string;

    @Column({ nullable: true, name: 'DELETE_FLAG' })
    deleteFlag: string;

    @PrimaryColumn({ name: '__$operation' })
    operation: number;

    @PrimaryColumn({ name: '__$start_lsn' })
    startLSN: Buffer;

    @PrimaryColumn({ name: '__$seqval' })
    seqVal: Buffer;

    @PrimaryColumn({ name: '__$command_id' })
    commandId: number;
}