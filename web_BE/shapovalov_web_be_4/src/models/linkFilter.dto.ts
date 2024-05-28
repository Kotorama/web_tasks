import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsOptional, IsEmail, IsDate } from 'class-validator';
import { UUID } from 'mongodb';

export class LinkFilterDto {

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  originalLink: string;

  @ApiProperty({ type: Date })
  @IsDate()
  gt: Date;

  @ApiProperty({ type: Date })
  @IsDate()
  lt: Date;
}
