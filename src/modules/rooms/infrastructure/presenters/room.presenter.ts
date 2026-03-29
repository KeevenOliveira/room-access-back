import type { Room } from '../../domain/entities/room.entity';

export interface RoomPresenterOutput {
  id: string;
  name: string;
  description: string | null | undefined;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class RoomPresenter {
  static toHttp(room: Room): RoomPresenterOutput {
    return {
      id: room.id.value,
      name: room.name.value,
      description: room.description,
      isActive: room.isActive,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    };
  }

  static toHttpList(rooms: Room[]): RoomPresenterOutput[] {
    return rooms.map(RoomPresenter.toHttp);
  }
}
