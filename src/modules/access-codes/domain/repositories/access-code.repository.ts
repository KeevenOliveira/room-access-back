import type { AccessCode } from '../entities/access-code.entity';

export abstract class AccessCodeRepository {
  abstract findById(id: string): Promise<AccessCode | null>;
  abstract findByCode(code: string): Promise<AccessCode | null>;
  abstract findByRoomId(roomId: string): Promise<AccessCode[]>;
  abstract findByNicknameAndRoomId(nickname: string, roomId: string): Promise<AccessCode | null>;
  abstract countActiveByRoomId(roomId: string): Promise<number>;
  abstract save(code: AccessCode): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
