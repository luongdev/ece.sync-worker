import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "cdc.dbo_EGML_EMAIL_ADDRESS_CT" })
export class egmlEmailAddressCDCEntity {
  @PrimaryColumn({ name: "EMAIL_ID" })
  emailId: number;

  @PrimaryColumn({ nullable: false, name: "EMAIL_ADDRESS" })
  emailAddress: string;

  @PrimaryColumn({ nullable: false, name: "ADDRESS_FLAG" })
  addressFlag: number;

  @PrimaryColumn({ name: '__$operation' })
  operation: number;

  @PrimaryColumn({ name: '__$start_lsn' })
  startLSN: Buffer;

  @PrimaryColumn({ name: '__$seqval' })
  seqVal: Buffer;

  @PrimaryColumn({ name: '__$command_id' })
  commandId: number;

}
