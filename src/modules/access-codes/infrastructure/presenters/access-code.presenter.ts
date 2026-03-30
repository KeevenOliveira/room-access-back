import type { AccessCode } from '../../domain/entities/access-code.entity';

export interface AccessCodePresenterOutput {
  id: string;
  roomId: string;
  code: string;
  nickname: string;
  isActive: boolean;
  createdAt: Date;
}

export class AccessCodePresenter {
  static toHttp(accessCode: AccessCode): AccessCodePresenterOutput {
    return {
      id: accessCode.id.value,
      roomId: accessCode.roomId,
      code: accessCode.code.value,
      nickname: accessCode.nickname,
      isActive: accessCode.isActive,
      createdAt: accessCode.createdAt,
    };
  }

  static toHttpList(accessCodes: AccessCode[]): AccessCodePresenterOutput[] {
    return accessCodes.map(AccessCodePresenter.toHttp);
  }
}
