import { Injectable } from '@nestjs/common';
import type { UseCase } from '@core/application/use-case.interface';
import { AccessCodeRepository } from '../../../domain/repositories/access-code.repository';
import { RoomRepository } from '../../../../rooms/domain/repositories/room.repository';
import type { ValidateAccessDto } from './validate-access.dto';

export type ValidateAccessOutput =
  | { granted: true; roomId: string; roomName: string; nickname: string | null }
  | { granted: false; reason: 'room_not_found' | 'invalid_code' };

@Injectable()
export class ValidateAccessUseCase implements UseCase<ValidateAccessDto, ValidateAccessOutput> {
  constructor(
    private readonly accessCodeRepository: AccessCodeRepository,
    private readonly roomRepository: RoomRepository,
  ) {}

  async execute(input: ValidateAccessDto): Promise<ValidateAccessOutput> {
    const room = await this.roomRepository.findByName(input.roomName);
    if (!room) {
      return { granted: false, reason: 'room_not_found' };
    }

    const accessCode = await this.accessCodeRepository.findByCode(input.code);
    if (!accessCode || !accessCode.isActive) {
      return { granted: false, reason: 'invalid_code' };
    }

    if (accessCode.roomId !== room.id.value) {
      return { granted: false, reason: 'invalid_code' };
    }

    return {
      granted: true,
      roomId: room.id.value,
      roomName: room.name.value,
      nickname: accessCode.nickname,
    };
  }
}
