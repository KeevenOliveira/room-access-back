import { Injectable } from '@nestjs/common';
import type { UseCase } from '@core/application/use-case.interface';
import { ConflictError, NotFoundError } from '@core/domain/errors/domain.error';
import { AccessCode } from '../../../domain/entities/access-code.entity';
import { AccessCodeRepository } from '../../../domain/repositories/access-code.repository';
import { RoomRepository } from '../../../../rooms/domain/repositories/room.repository';
import type { CreateAccessCodeDto } from './create-access-code.dto';

export interface CreateAccessCodeOutput {
  id: string;
}

@Injectable()
export class CreateAccessCodeUseCase
  implements UseCase<CreateAccessCodeDto, CreateAccessCodeOutput>
{
  private static readonly MAX_ACTIVE_CODES = 4;

  constructor(
    private readonly accessCodeRepository: AccessCodeRepository,
    private readonly roomRepository: RoomRepository,
  ) {}

  async execute(input: CreateAccessCodeDto): Promise<CreateAccessCodeOutput> {
    const room = await this.roomRepository.findById(input.roomId);
    if (!room) {
      throw new NotFoundError('Room', input.roomId);
    }

    const activeCount = await this.accessCodeRepository.countActiveByRoomId(input.roomId);
    if (activeCount >= CreateAccessCodeUseCase.MAX_ACTIVE_CODES) {
      throw new ConflictError('Room has reached the maximum of 4 active access codes.');
    }

    const duplicateNickname = await this.accessCodeRepository.findByNicknameAndRoomId(
      input.nickname,
      input.roomId,
    );
    if (duplicateNickname) {
      throw new ConflictError(
        `An active code with nickname '${input.nickname}' already exists in this room.`,
      );
    }

    const accessCode = AccessCode.create({
      roomId: input.roomId,
      nickname: input.nickname,
    });

    await this.accessCodeRepository.save(accessCode);

    return { id: accessCode.id.value };
  }
}
