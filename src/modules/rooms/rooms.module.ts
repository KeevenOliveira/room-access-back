import { Module } from '@nestjs/common';
import { CreateRoomUseCase } from './application/use-cases/create-room/create-room.use-case';
import { FindRoomByIdUseCase } from './application/use-cases/find-room/find-room.use-case';
import { ListRoomsUseCase } from './application/use-cases/list-rooms/list-rooms.use-case';
import { RoomRepository } from './domain/repositories/room.repository';
import { RoomController } from './infrastructure/controllers/room.controller';
import { PrismaRoomRepository } from './infrastructure/repositories/prisma-room.repository';

@Module({
  controllers: [RoomController],
  providers: [
    { provide: RoomRepository, useClass: PrismaRoomRepository },
    CreateRoomUseCase,
    FindRoomByIdUseCase,
    ListRoomsUseCase,
  ],
})
export class RoomsModule {}
