import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 55, nullable: false })
  AdminName!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Index()
  @Column({ nullable: true, type: "varchar" })
  uuid!: string | null;

  @Column({
    type: "varchar",
    length: 50,
    default: "admin",
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
}
