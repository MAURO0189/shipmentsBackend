import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Shipment } from "./shipment.entity";
import { ShipmentStatus } from "../../../domain/enums/shipment-status.enum";

@Entity()
export class ShipmentStatusHistory {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "bigint", unsigned: true })
  shipmentId!: number;

  @Column({ type: "enum", enum: ShipmentStatus })
  oldStatus!: ShipmentStatus;

  @Column({ type: "enum", enum: ShipmentStatus })
  newStatus!: ShipmentStatus;

  @CreateDateColumn()
  changedAt!: Date;

  @ManyToOne(() => Shipment)
  @JoinColumn({ name: "shipmentId" })
  shipment!: Shipment;
}
