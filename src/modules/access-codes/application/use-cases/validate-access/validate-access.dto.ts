import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateAccessDto {
  @ApiProperty({ example: 'Server Room' })
  @IsNotEmpty()
  @IsString()
  roomName!: string;

  @ApiProperty({ example: 'ABC123XYZ' })
  @IsNotEmpty()
  @IsString()
  code!: string;
}
