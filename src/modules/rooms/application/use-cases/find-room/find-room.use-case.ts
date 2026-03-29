import { Injectable } from '@nestjs/common';
import type { UseCase } from '@core/application/use-case.interface';
import { NotFoundError } from '@core/domain/errors/domain.error';
import type { Room } from '../../../domain/entities/room.entity';
import { RoomRepository } from '../../../domain/repositories/room.repository';
import type { FindRoomByIdDto } from './find-room.dto';

@Injectable()
export class FindRoomByIdUseCase implements UseCase<FindRoomByIdDto, Room> {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(input: FindRoomByIdDto): Promise<Room> {
    const room = await this.roomRepository.findById(input.id);

    if (!room) {
      throw new NotFoundError('Room', input.id);
    }

    return room;
  }
}
