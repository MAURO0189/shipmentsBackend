import { IShipmentRepository } from "../auth/interfaces/shipment.repository.interface";
import { CreateShipmentDto } from "../domain/dtos/create-shipment.dto";
import { ShipmentStatus } from "../domain/enums/shipment-status.enum";
import { AppDataSource } from "../infrastructure/database/data-source";
import { Shipment } from "../infrastructure/database/entities/shipment.entity";
import { ShipmentStatusHistory } from "../infrastructure/database/entities/ShipmentStatusHistory.entity";

export class ShipmentService {
  constructor(private readonly shipmentRepository: IShipmentRepository) {}

  async createShipment(
    data: CreateShipmentDto,
    userId: number,
    userUuid: string
  ): Promise<Shipment> {
    try {
      return await this.shipmentRepository.create(data, userId, userUuid);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al crear el envío: ${error.message}`);
      }
      throw new Error("Error desconocido al crear el envío");
    }
  }

  async updateShipmentStatus(
    id: number,
    status: ShipmentStatus,
    userId: number
  ): Promise<Shipment> {
    try {
      const shipment = await this.shipmentRepository.findById(id);

      if (!shipment) {
        throw new Error(`Envío con ID ${id} no encontrado`);
      }

      if (shipment.userId !== userId) {
        throw new Error("No tienes permiso para actualizar este envío");
      }

      const updatedShipment = await this.shipmentRepository.updateStatus(
        id,
        status
      );

      if (!updatedShipment) {
        throw new Error(`No se pudo actualizar el envío con ID ${id}`);
      }

      return updatedShipment;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error al actualizar el estado del envío: ${error.message}`
        );
      }
      throw new Error("Error desconocido al actualizar el estado del envío");
    }
  }

  async getShipmentsByUserId(userId: number): Promise<Shipment[]> {
    try {
      return await this.shipmentRepository.findByUserId(userId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error al obtener los envíos del usuario: ${error.message}`
        );
      }
      throw new Error("Error desconocido al obtener los envíos");
    }
  }

  async getShipmentById(id: number): Promise<Shipment | null> {
    try {
      const shipment = await this.shipmentRepository.findById(id);
      if (!shipment) {
        throw new Error(`Envío con ID ${id} no encontrado`);
      }
      return shipment;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al obtener el envío: ${error.message}`);
      }
      throw new Error("Error desconocido al obtener el envío");
    }
  }

  async getShipmentByUuid(uuid: string): Promise<Shipment | null> {
    try {
      const shipment = await this.shipmentRepository.findByUuid(uuid);
      if (!shipment) {
        throw new Error(`Envío con UUID ${uuid} no encontrado`);
      }
      return shipment;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al obtener el envío: ${error.message}`);
      }
      throw new Error("Error desconocido al obtener el envío");
    }
  }

  async getStatusHistory(shipmentId: number): Promise<ShipmentStatusHistory[]> {
    const historyRepo = AppDataSource.getRepository(ShipmentStatusHistory);

    return historyRepo.find({
      where: { shipmentId },
      order: { changedAt: "DESC" }, // Opcional: orden cronológico inverso
    });
  }
}
