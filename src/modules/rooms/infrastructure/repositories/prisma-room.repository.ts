import { Injectable } from '@nestjs/common';
import { type PaginatedResult, type PaginationParams, paginate } from '@core/application/pagination';
import { PrismaService } from '@core/infrastructure/database/prisma.service';
import type { Room } from '../../domain/entities/room.entity';
import { RoomRepository } from '../../domain/repositories/room.repository';
import { RoomMapper } from '../mappers/room.mapper';

@Injectable()
export class PrismaRoomRepository extends RoomRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findById(id: string): Promise<Room | null> {
    const row = await this.prisma.room.findUnique({ where: { id } });
    return row ? RoomMapper.toDomain(row) : null;
  }

  async findByName(name: string): Promise<Room | null> {
    const row = await this.prisma.room.findUnique({ where: { name } });
    return row ? RoomMapper.toDomain(row) : null;
  }

  async findAll(params: PaginationParams): Promise<PaginatedResult<Room>> {
    const skip = (params.page - 1) * params.limit;

    const [rows, total] = await Promise.all([
      this.prisma.room.findMany({ skip, take: params.limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.room.count(),
    ]);

    return paginate(rows.map(RoomMapper.toDomain), total, params);
  }

  async save(room: Room): Promise<void> {
    const data = RoomMapper.toPersistence(room);

    await this.prisma.room.upsert({
      where: { id: data.id },
      create: data,
      update: {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        updatedAt: data.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.room.delete({ where: { id } });
  }
}
