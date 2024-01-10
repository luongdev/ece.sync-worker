import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "cdc.dbo_EGML_EMAIL_ADDRESS" })
export class egmlEmailAddressEntity {
  @PrimaryColumn({ name: "EMAIL_ID" })
  emailId: number;

  @PrimaryColumn({ nullable: false, name: "EMAIL_ADDRESS" })
  emailAddress: string;

  @PrimaryColumn({ nullable: false, name: "ADDRESS_FLAG" })
  addressFlag: number;

}
