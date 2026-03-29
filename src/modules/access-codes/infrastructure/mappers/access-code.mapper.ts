import type { AccessCode as PrismaAccessCode } from '@prisma/client';
import { UniqueEntityId } from '@core/domain/value-objects/unique-entity-id.vo';
import { AccessCode } from '../../domain/entities/access-code.entity';
import { AccessCodeValue } from '../../domain/value-objects/access-code-value.vo';

export class AccessCodeMapper {
  static toDomain(raw: PrismaAccessCode): AccessCode {
    return AccessCode.reconstitute(
      {
        roomId: raw.roomId,
        code: AccessCodeValue.create(raw.code),
        nickname: raw.nickname,
        isActive: raw.isActive,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(accessCode: AccessCode): {
    id: string;
    roomId: string;
    code: string;
    nickname: string | null;
    isActive: boolean;
    createdAt: Date;
  } {
    return {
      id: accessCode.id.value,
      roomId: accessCode.roomId,
      code: accessCode.code.value,
      nickname: accessCode.nickname,
      isActive: accessCode.isActive,
      createdAt: accessCode.createdAt,
    };
  }
}
