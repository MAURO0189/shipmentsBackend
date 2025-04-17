import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Shipment } from "./shipment.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 55, nullable: false })
  username!: string;

  @Column({ type: "varchar", length: 55, nullable: false })
  lastName!: string;

  @Column({ type: "varchar", length: 30, nullable: false })
  phoneNumber!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", nullable: false })
  password!: string;

  @Index()
  @Column({ type: "varchar", nullable: true })
  uuid!: string | null;

  @Column({
    type: "varchar",
    length: 50,
    default: "user",
    nullable: false,
  })
  role!: string;

  @CreateDateColumn({
    precision: 0,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createAt!: Date;

  @UpdateDateColumn({
    precision: 0,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  lastUpdate!: Date;

  @OneToMany(() => Shipment, (shipment) => shipment.user)
  shipments!: Shipment[];
}
