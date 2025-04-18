import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
} from "class-validator";

export class CreateShipmentRouteDto {
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString({ message: "El nombre debe ser un texto" })
  name!: string;

  @IsOptional()
  @IsString({ message: "La descripción debe ser un texto" })
  description?: string;

  @IsNotEmpty({ message: "El transportista es obligatorio" })
  @IsNumber({}, { message: "El ID del transportista debe ser un número" })
  carrierId!: number;

  @IsArray({ message: "Los envíos deben ser un arreglo" })
  @IsNumber(
    {},
    { each: true, message: "Los IDs de los envíos deben ser números" }
  )
  shipmentIds!: number[];
}
