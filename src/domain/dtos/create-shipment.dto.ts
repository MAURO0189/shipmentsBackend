import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { ShipmentStatus } from "../enums/shipment-status.enum";

export class CreateShipmentDto {
  @IsString()
  origin!: string;

  @IsString()
  destination!: string;

  @IsNotEmpty({ message: "La dirección de origen es obligatoria" })
  @IsString({ message: "La dirección de origen debe de ser exacta" })
  originAddress!: string;

  @IsNotEmpty({ message: "La dirección de destino es obligatoria" })
  @IsString({ message: "La dirección de destino debe de ser exacta" })
  destinationAddress!: string;

  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.1)
  weight!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  height!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  width!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  length!: number;

  @IsNotEmpty()
  @IsString()
  productType!: string;

  @IsNumber()
  @IsOptional()
  declaredValue?: number;

  @IsBoolean()
  @IsOptional()
  isFragile?: boolean;

  @IsOptional()
  @IsEnum(ShipmentStatus)
  status?: ShipmentStatus;
}
