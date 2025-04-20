import "reflect-metadata";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Admin } from "./entities/admin.entity";
import { Shipment } from "./entities/shipment.entity";
import { ShipmentRoute } from "./entities/ShipmentRoute.entity";
import { Carrier } from "./entities/Carrier.entity";
import { RouteShipment } from "./entities/RouteShipment.entity";
import { ShipmentStatusHistory } from "./entities/ShipmentStatusHistory.entity";

config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Admin,
    Shipment,
    ShipmentRoute,
    Carrier,
    RouteShipment,
    ShipmentStatusHistory,
  ],
});
