import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindRoomByIdDto {
  @ApiProperty({ example: 'uuid-here' })
  @IsNotEmpty()
  @IsString()
  id!: string;
}
