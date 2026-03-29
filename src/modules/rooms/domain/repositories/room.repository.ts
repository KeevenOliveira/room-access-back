import type { PaginatedResult, PaginationParams } from '@core/application/pagination';
import type { Room } from '../entities/room.entity';

export abstract class RoomRepository {
  abstract findById(id: string): Promise<Room | null>;
  abstract findByName(name: string): Promise<Room | null>;
  abstract findAll(params: PaginationParams): Promise<PaginatedResult<Room>>;
  abstract save(room: Room): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
