import { Injectable } from '@nestjs/common';
import type { UseCase } from '@core/application/use-case.interface';
import { NotFoundError } from '@core/domain/errors/domain.error';
import { AccessCodeRepository } from '../../../domain/repositories/access-code.repository';
import type { AccessCode } from '../../../domain/entities/access-code.entity';
import { RoomRepository } from '../../../../rooms/domain/repositories/room.repository';

export interface ListAccessCodesInput {
  roomId: string;
}

@Injectable()
export class ListAccessCodesUseCase implements UseCase<ListAccessCodesInput, AccessCode[]> {
  constructor(
    private readonly accessCodeRepository: AccessCodeRepository,
    private readonly roomRepository: RoomRepository,
  ) {}

  async execute(input: ListAccessCodesInput): Promise<AccessCode[]> {
    const room = await this.roomRepository.findById(input.roomId);
    if (!room) {
      throw new NotFoundError('Room', input.roomId);
    }

    return this.accessCodeRepository.findByRoomId(input.roomId);
  }
}
