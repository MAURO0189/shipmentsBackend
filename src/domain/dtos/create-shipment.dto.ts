import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { ShipmentStatus } from "../enums/shipment-status.enum";

export class CreateShipmentDto {
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

  @IsOptional()
  @IsEnum(ShipmentStatus)
  status?: ShipmentStatus;
}
