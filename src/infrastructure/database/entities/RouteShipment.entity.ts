import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ShipmentRoute } from "./ShipmentRoute.entity";
import { Shipment } from "./shipment.entity";

@Entity()
export class RouteShipment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "bigint", unsigned: true })
  routeId!: number;

  @Column({ type: "bigint", unsigned: true })
  shipmentId!: number;

  @Column()
  @CreateDateColumn()
  assignedAt!: Date;

  @ManyToOne(() => ShipmentRoute, (route) => route.routeShipments)
  @JoinColumn({ name: "routeId" })
  route!: ShipmentRoute;

  @ManyToOne(() => Shipment)
  @JoinColumn({ name: "shipmentId" })
  shipment!: Shipment;
}
