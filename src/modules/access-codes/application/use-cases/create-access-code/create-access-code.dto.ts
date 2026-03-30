import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAccessCodeDto {
  @ApiProperty({ example: 'uuid-of-room' })
  @IsNotEmpty()
  @IsString()
  roomId!: string;

  @ApiPropertyOptional({ example: 'Office laptop' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nickname?: string;
}
