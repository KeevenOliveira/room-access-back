import { type PaginatedResult, type PaginationParams, paginate } from '@core/application/pagination';
import { UniqueEntityId } from '@core/domain/value-objects/unique-entity-id.vo';
import { Room } from '../../domain/entities/room.entity';
import { RoomRepository } from '../../domain/repositories/room.repository';

export class InMemoryRoomRepository extends RoomRepository {
  public items: Room[] = [];

  async findById(id: string): Promise<Room | null> {
    return this.items.find((r) => r.id.value === id) ?? null;
  }

  async findByName(name: string): Promise<Room | null> {
    return this.items.find((r) => r.name.value === name) ?? null;
  }

  async findAll(params: PaginationParams): Promise<PaginatedResult<Room>> {
    const start = (params.page - 1) * params.limit;
    const data = this.items.slice(start, start + params.limit);
    return paginate(data, this.items.length, params);
  }

  async save(room: Room): Promise<void> {
    const index = this.items.findIndex((r) => r.id.equals(room.id));
    if (index >= 0) {
      this.items[index] = room;
    } else {
      this.items.push(room);
    }
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((r) => r.id.value !== id);
  }
}
