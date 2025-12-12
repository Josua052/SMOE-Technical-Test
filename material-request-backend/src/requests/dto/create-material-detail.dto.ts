import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMaterialDetailDto {
  @IsOptional()
  @IsString()
  materialCode?: string;

  @IsString()
  @IsNotEmpty()
  materialDescription: string;

  @IsString()
  @IsNotEmpty()
  materialType: string;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsOptional()
  @IsString()
  uom?: string;

  @IsDateString()
  neededDate: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
