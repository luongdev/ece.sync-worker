import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import { egplCasemgmtActivity } from './egpl-casemgmt-activity.entity';

@Entity({ name: 'EGPL_DEPARTMENT' })
export class egplDepartmentEntity {
    @PrimaryColumn({ name: 'DEPARTMENT_ID' })
    departmentId: number;

    @Column({ nullable: false, name: 'DEPARTMENT_NAME' })
    departmentName: string;

    @Column({ nullable: false, name: 'DEPARTMENT_DESC' })
    departmentDesc: string;

    @Column({ nullable: true, name: 'DELETE_FLAG' })
    deleteFlag: string;
    
    @OneToOne(() => egplCasemgmtActivity, (activity) => activity.department)
    @JoinColumn({ name: 'DEPARTMENT_ID', referencedColumnName: 'departmentId' })
    activity: egplCasemgmtActivity;
    
}