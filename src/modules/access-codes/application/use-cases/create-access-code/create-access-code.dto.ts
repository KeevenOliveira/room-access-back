import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessCodeDto {
  @ApiProperty({ example: 'uuid-of-room' })
  @IsNotEmpty()
  @IsString()
  roomId!: string;

  @ApiProperty({ example: 'Office laptop' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nickname!: string;
}
