import { Injectable } from '@nestjs/common';
import type { UseCase } from '@core/application/use-case.interface';
import { type PaginatedResult, type PaginationParams, paginate } from '@core/application/pagination';
import { RoomRepository } from '../../../domain/repositories/room.repository';
import type { Room } from '../../../domain/entities/room.entity';

@Injectable()
export class ListRoomsUseCase implements UseCase<PaginationParams, PaginatedResult<Room>> {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(input: PaginationParams): Promise<PaginatedResult<Room>> {
    return this.roomRepository.findAll(input);
  }
}
