import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateShipmentRouteDto {
  @IsNotEmpty({ message: "La dirección de origen es obligatoria" })
  @IsString({ message: "La dirección de origen debe de ser exacta" })
  originAddress!: string;

  @IsNotEmpty({ message: "La dirección de destino es obligatoria" })
  @IsString({ message: "La dirección de destino debe de ser exacta" })
  destinationAddress!: string;

  @IsNotEmpty({ message: "El transportista es obligatorio" })
  @IsNumber({}, { message: "El ID del transportista debe ser un número" })
  carrierId!: number;

  @IsNotEmpty({ message: "El envío es obligatorio" })
  @IsNumber({}, { message: "El ID del envío debe ser un número" })
  shipmentId!: number;

  @IsOptional()
  @IsString({ message: "Las notas son opcionales" })
  notes?: string;
}
