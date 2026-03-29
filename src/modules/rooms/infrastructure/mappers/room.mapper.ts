import type { Room as PrismaRoom } from '@prisma/client';
import { UniqueEntityId } from '@core/domain/value-objects/unique-entity-id.vo';
import { Room } from '../../domain/entities/room.entity';
import { RoomName } from '../../domain/value-objects/room-name.vo';

export class RoomMapper {
  static toDomain(raw: PrismaRoom): Room {
    return Room.reconstitute(
      {
        name: RoomName.create(raw.name),
        description: raw.description,
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(room: Room): {
    id: string;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: room.id.value,
      name: room.name.value,
      description: room.description ?? null,
      isActive: room.isActive,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    };
  }
}
