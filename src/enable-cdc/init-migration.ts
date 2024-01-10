import { MigrationInterface, QueryRunner } from "typeorm";
import { LIST_TABLE_NAME } from "@/constants/constant";

let stringEnableTable = ``;
let stringDisableTable = '';

LIST_TABLE_NAME.forEach(el => {
    stringEnableTable += ` 
                            EXEC
                            sys.sp_cdc_enable_table
                            @source_schema = N'dbo',
                            @source_name   = N'${el}',
                            @role_name     = 'dbo',
                            @filegroup_name = null,
                            @supports_net_changes = 0
                        `;
    stringDisableTable += ` 
                            EXEC 
                            sys.sp_cdc_disable_table
                            @source_schema = N'dbo',
                            @source_name   = N'${el}',
                            @capture_instance = N'dbo_${el}'
                        `;
});

export class InitMigration1704732644223 implements MigrationInterface {
    name = 'InitMigration1704732644223';

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            USE ${process.env.DB_DATABASE_SOURCE} 

            EXEC sys.sp_cdc_enable_db    

            ${stringEnableTable}
            
            EXEC sys.sp_cdc_help_change_data_capture
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            USE ${process.env.DB_DATABASE_SOURCE}

            ${stringDisableTable}

            EXEC sys.sp_cdc_disable_db
        `);
    }

}
