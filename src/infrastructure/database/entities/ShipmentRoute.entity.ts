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
import { Carrier } from "./Carrier.entity";
import { RouteShipment } from "./RouteShipment.entity";
import { RouteStatus } from "../../../domain/enums/route-status.enum";

@Entity()
export class ShipmentRoute {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ unique: true })
  uuid!: string;

  @Column({ type: "varchar", length: 100 })
  originAddress!: string;

  @Column({ type: "varchar", length: 255 })
  destinationAddress!: string;

  @Column({
    type: "enum",
    enum: RouteStatus,
    default: RouteStatus.PENDING,
  })
  status!: RouteStatus;

  @Column({ type: "bigint", unsigned: true })
  carrierId!: number;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Carrier, (carrier) => carrier.routes)
  @JoinColumn({ name: "carrierId" })
  carrier!: Carrier;

  @OneToMany(() => RouteShipment, (routeShipment) => routeShipment.route, {
    cascade: true,
  })
  routeShipments!: RouteShipment[];
}
