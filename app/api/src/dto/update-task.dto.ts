import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
