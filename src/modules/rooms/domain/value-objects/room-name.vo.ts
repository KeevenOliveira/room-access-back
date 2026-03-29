import { InvalidArgumentError } from '@core/domain/errors/domain.error';
import { ValueObject } from '@core/domain/value-objects/value-object';

interface RoomNameProps {
  value: string;
}

export class RoomName extends ValueObject<RoomNameProps> {
  private static readonly MIN_LENGTH = 2;
  private static readonly MAX_LENGTH = 100;

  private constructor(props: RoomNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  static create(name: string): RoomName {
    const trimmed = name?.trim();

    if (!trimmed) {
      throw new InvalidArgumentError('Room name cannot be empty.');
    }

    if (trimmed.length < RoomName.MIN_LENGTH) {
      throw new InvalidArgumentError(
        `Room name must be at least ${RoomName.MIN_LENGTH} characters long.`,
      );
    }

    if (trimmed.length > RoomName.MAX_LENGTH) {
      throw new InvalidArgumentError(
        `Room name must be at most ${RoomName.MAX_LENGTH} characters long.`,
      );
    }

    return new RoomName({ value: trimmed });
  }
}
