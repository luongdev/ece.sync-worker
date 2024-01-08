import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { egmlEmailEntity } from "./egml-email.entity";

@Entity({ name: "EGML_EMAIL_ADDRESS" })
export class egmlEmailAddressEntity {
  @PrimaryColumn({ name: "EMAIL_ID" })
  emailId: number;

  @PrimaryColumn({ nullable: false, name: "EMAIL_ADDRESS" })
  emailAddress: string;

  @PrimaryColumn({ nullable: false, name: "ADDRESS_FLAG" })
  addressFlag: number;

  @OneToOne(() => egmlEmailEntity, (email) => email.emailAddressTo)
  @JoinColumn({ name: "EMAIL_ID", referencedColumnName: "emailId" })
  email: egmlEmailEntity;
}
