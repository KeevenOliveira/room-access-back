import { Injectable } from '@nestjs/common';
import type { UseCase } from '@core/application/use-case.interface';
import { NotFoundError } from '@core/domain/errors/domain.error';
import { RoomRepository } from '../../../domain/repositories/room.repository';

export interface DeleteRoomInput {
  id: string;
}

@Injectable()
export class DeleteRoomUseCase implements UseCase<DeleteRoomInput, void> {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(input: DeleteRoomInput): Promise<void> {
    const room = await this.roomRepository.findById(input.id);
    if (!room) {
      throw new NotFoundError('Room', input.id);
    }

    await this.roomRepository.delete(input.id);
  }
}
