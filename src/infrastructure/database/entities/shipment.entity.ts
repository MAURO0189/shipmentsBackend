import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { ShipmentStatus } from "../../../domain/enums/shipment-status.enum";
import { RouteShipment } from "./RouteShipment.entity";

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ unique: true })
  uuid!: string;

  @Column("varchar")
  origin!: string;

  @Column("varchar")
  destination!: string;

  @Column("varchar", { nullable: false })
  originAddress!: string;

  @Column("varchar", { nullable: false })
  destinationAddress!: string;

  @Column("varchar")
  description!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  weight!: number;

  @Column("int")
  height!: number;

  @Column("int")
  width!: number;

  @Column("int")
  length!: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: false })
  declaredValue!: number;

  @Column("boolean", { default: false })
  isFragile!: boolean;

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

  @OneToMany(() => RouteShipment, (routeShipment) => routeShipment.shipment)
  routeShipments!: RouteShipment[];
}
