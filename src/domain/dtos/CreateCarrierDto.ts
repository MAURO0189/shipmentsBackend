import { IsNotEmpty, IsString, IsOptional, Length } from "class-validator";

export class CreateCarrierDto {
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString({ message: "El nombre debe ser un texto" })
  @Length(2, 100, { message: "El nombre debe tener entre 2 y 100 caracteres" })
  name!: string;

  @IsNotEmpty({ message: "El teléfono es obligatorio" })
  @IsString({ message: "El teléfono debe ser un texto" })
  @Length(7, 15, { message: "El teléfono debe tener entre 7 y 15 caracteres" })
  phone!: string;

  @IsOptional()
  @IsString({ message: "El modelo del vehículo debe ser un texto" })
  vehicleModel?: string;

  @IsOptional()
  @IsString({ message: "La placa del vehículo debe ser un texto" })
  vehiclePlate?: string;
}
