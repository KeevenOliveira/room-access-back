import { AggregateRoot } from '@core/domain/entities/aggregate-root';
import type { UniqueEntityId } from '@core/domain/value-objects/unique-entity-id.vo';
import { AccessCodeValue } from '../value-objects/access-code-value.vo';

export interface AccessCodeProps {
  roomId: string;
  code: AccessCodeValue;
  nickname: string;
  isActive: boolean;
  createdAt: Date;
}

export interface CreateAccessCodeProps {
  roomId: string;
  nickname: string;
}

export class AccessCode extends AggregateRoot<AccessCodeProps> {
  private constructor(props: AccessCodeProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: CreateAccessCodeProps, id?: UniqueEntityId): AccessCode {
    const rawCode = AccessCode.generateCode();
    return new AccessCode(
      {
        roomId: props.roomId,
        code: AccessCodeValue.create(rawCode),
        nickname: props.nickname,
        isActive: true,
        createdAt: new Date(),
      },
      id,
    );
  }

  static reconstitute(props: AccessCodeProps, id: UniqueEntityId): AccessCode {
    return new AccessCode(props, id);
  }

  private static generateCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 9 }, () => chars[Math.floor(Math.random() * chars.length)]).join(
      '',
    );
  }

  get roomId(): string {
    return this.props.roomId;
  }

  get code(): AccessCodeValue {
    return this.props.code;
  }

  get nickname(): string {
    return this.props.nickname;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  revoke(): void {
    this.props.isActive = false;
  }
}
