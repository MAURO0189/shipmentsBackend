export enum ShipmentStatus {
  PENDING = "pending", // Pendiente (recién creado)
  PROCESSING = "processing", // En procesamiento
  IN_TRANSIT = "in_transit", // En tránsito
  DELIVERED = "delivered", // Entregado
  CANCELLED = "cancelled", // Cancelado
  RETURNED = "returned", // Devuelto
}
