import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { ShipmentStatus } from "../../../domain/enums/shipment-status.enum";

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  uuid!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  weight!: number;

  @Column("int")
  height!: number;

  @Column("int")
  width!: number;

  @Column("int")
  length!: number;

  @Column("varchar")
  productType!: string;

  @Column({
    type: "enum",
    enum: ShipmentStatus,
    default: ShipmentStatus.PENDING,
  })
  status!: ShipmentStatus;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  statusUpdatedAt!: Date;

  @Column({ type: "bigint", unsigned: true })
  userId!: number;

  @Column()
  userUuid!: string;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.shipments)
  @JoinColumn({ name: "userId" })
  user!: User;
}
