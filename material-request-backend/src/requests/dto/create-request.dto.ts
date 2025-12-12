import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMaterialDetailDto } from './create-material-detail.dto';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  requestNo: string;

  @IsDateString()
  requestDate: string;

  @IsString()
  @IsNotEmpty()
  requester: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsOptional()
  @IsString()
  status?: string; // default PENDING jika tidak diisi

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMaterialDetailDto)
  materials: CreateMaterialDetailDto[];
}
