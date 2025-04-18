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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  uuid!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description?: string;

  @Column({
    type: "enum",
    enum: RouteStatus,
    default: RouteStatus.PENDING,
  })
  status!: RouteStatus;

  @Column({ type: "bigint", unsigned: true })
  carrierId!: number;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Carrier, (carrier) => carrier.routes)
  @JoinColumn({ name: "carrierId" })
  carrier!: Carrier;

  @OneToMany(() => RouteShipment, (routeShipment) => routeShipment.route)
  routeShipments!: RouteShipment[];
}
