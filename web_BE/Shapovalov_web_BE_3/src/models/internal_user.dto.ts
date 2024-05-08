import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsOptional } from '@nestjs/class-validator';

export class InternalUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  role: string;
}