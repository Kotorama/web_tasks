import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, } from 'class-validator';

export class LinkDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  originalLink: string;
}
