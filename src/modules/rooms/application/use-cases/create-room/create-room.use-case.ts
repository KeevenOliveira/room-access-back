import { Injectable } from '@nestjs/common';
import type { UseCase } from '@core/application/use-case.interface';
import { ConflictError } from '@core/domain/errors/domain.error';
import { Room } from '../../../domain/entities/room.entity';
import { RoomRepository } from '../../../domain/repositories/room.repository';
import { RoomName } from '../../../domain/value-objects/room-name.vo';
import type { CreateRoomDto } from './create-room.dto';

export interface CreateRoomOutput {
  id: string;
}

@Injectable()
export class CreateRoomUseCase implements UseCase<CreateRoomDto, CreateRoomOutput> {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(input: CreateRoomDto): Promise<CreateRoomOutput> {
    const roomName = RoomName.create(input.name);

    const existing = await this.roomRepository.findByName(roomName.value);
    if (existing) {
      throw new ConflictError(`Room with name '${roomName.value}' already exists.`);
    }

    const room = Room.create({
      name: roomName,
      description: input.description ?? null,
    });

    await this.roomRepository.save(room);

    return { id: room.id.value };
  }
}
