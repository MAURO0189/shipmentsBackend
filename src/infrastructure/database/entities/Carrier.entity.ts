import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ShipmentRoute } from "./ShipmentRoute.entity";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Carrier {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ unique: true })
  uuid!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 15 })
  phone!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  vehicleModel?: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  vehiclePlate?: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => ShipmentRoute, (route) => route.carrier)
  routes!: ShipmentRoute[];
}
