import { Between, Repository } from "typeorm";
import { AppDataSource } from "../../infrastructure/database/data-source";
import { ShipmentRoute } from "../../infrastructure/database/entities/ShipmentRoute.entity";
import { RouteShipment } from "../../infrastructure/database/entities/RouteShipment.entity";
import { CreateShipmentRouteDto } from "../../domain/dtos/CreateShipmentRouteDto";
import { IShipmentRouteRepository } from "../../auth/interfaces/shipment-route.repository.interface";
import { v4 as uuidv4 } from "uuid";
import { RouteStatus } from "../enums/route-status.enum";

export class ShipmentRouteRepository implements IShipmentRouteRepository {
  private routeRepo: Repository<ShipmentRoute>;
  private routeShipmentRepo: Repository<RouteShipment>;

  constructor() {
    this.routeRepo = AppDataSource.getRepository(ShipmentRoute);
    this.routeShipmentRepo = AppDataSource.getRepository(RouteShipment);
  }

  async create(data: CreateShipmentRouteDto): Promise<ShipmentRoute> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const uuid = uuidv4();
      const now = new Date();

      const newRoute = queryRunner.manager.create(ShipmentRoute, {
        uuid,
        carrierId: data.carrierId,
        originAddress: data.originAddress,
        destinationAddress: data.destinationAddress,
        notes: data.notes,
        status: RouteStatus.PENDING,
        createdAt: now,
        updatedAt: now,
      });

      const savedRoute = await queryRunner.manager.save(
        ShipmentRoute,
        newRoute
      );

      // Crear relación en RouteShipment usando queryRunner.manager
      const routeShipment = queryRunner.manager.create(RouteShipment, {
        routeId: savedRoute.id,
        shipmentId: data.shipmentId,
        assignedAt: now,
      });

      await queryRunner.manager.save(RouteShipment, routeShipment);

      await queryRunner.commitTransaction();

      // Puedes usar el repositorio normal fuera de la transacción
      const result = await this.findById(savedRoute.id);
      if (!result) {
        throw new Error("ShipmentRoute not found after creation");
      }
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findById(id: number): Promise<ShipmentRoute | null> {
    return this.routeRepo.findOne({
      where: { id },
      relations: ["carrier", "routeShipments", "routeShipments.shipment"],
    });
  }

  async findByUuid(uuid: string): Promise<ShipmentRoute | null> {
    return this.routeRepo.findOne({
      where: { uuid },
      relations: ["carrier", "routeShipments", "routeShipments.shipment"],
    });
  }

  async findAll(): Promise<ShipmentRoute[]> {
    return this.routeRepo.find({
      relations: ["carrier"],
    });
  }

  async findByStatus(status: RouteStatus): Promise<ShipmentRoute[]> {
    return this.routeRepo.find({
      where: { status },
      relations: ["carrier", "routeShipments", "routeShipments.shipment"],
    });
  }

  async updateStatus(
    id: number,
    status: RouteStatus
  ): Promise<ShipmentRoute | null> {
    await this.routeRepo.update(id, {
      status,
      updatedAt: new Date(),
    });

    return this.findById(id);
  }

  async findByShipmentId(shipmentId: number): Promise<ShipmentRoute[]> {
    const routeShipments = await this.routeShipmentRepo.find({
      where: { shipmentId },
      relations: ["route", "route.carrier"],
    });

    return routeShipments.map((rs) => rs.route);
  }

  async findByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<ShipmentRoute[]> {
    return this.routeRepo.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      relations: ["carrier", "routeShipments", "routeShipments.shipment"],
    });
  }

  async findByCarrierId(carrierId: number): Promise<ShipmentRoute[]> {
    return this.routeRepo.find({
      where: { carrierId },
      relations: ["carrier", "routeShipments", "routeShipments.shipment"],
    });
  }

  async findByShipmentStatus(status: string): Promise<ShipmentRoute[]> {
    const routes = await this.routeRepo.find({
      relations: ["routeShipments", "routeShipments.shipment", "carrier"],
    });

    // Filtrar rutas que contengan envíos con el estado especificado
    return routes.filter((route) =>
      route.routeShipments.some((rs) => rs.shipment.status === status)
    );
  }
}
