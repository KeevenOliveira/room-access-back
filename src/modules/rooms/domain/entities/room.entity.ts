import { AggregateRoot } from '@core/domain/entities/aggregate-root';
import type { UniqueEntityId } from '@core/domain/value-objects/unique-entity-id.vo';
import type { RoomName } from '../value-objects/room-name.vo';

export interface RoomProps {
  name: RoomName;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRoomProps {
  name: RoomName;
  description?: string | null;
}

export class Room extends AggregateRoot<RoomProps> {
  private constructor(props: RoomProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: CreateRoomProps, id?: UniqueEntityId): Room {
    return new Room(
      {
        ...props,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );
  }

  static reconstitute(props: RoomProps, id: UniqueEntityId): Room {
    return new Room(props, id);
  }

  get name(): RoomName {
    return this.props.name;
  }

  get description(): string | null | undefined {
    return this.props.description;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  deactivate(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  updateDescription(description: string | null): void {
    this.props.description = description;
    this.props.updatedAt = new Date();
  }
}
