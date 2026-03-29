import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from '../../application/use-cases/create-room/create-room.dto';
import { CreateRoomUseCase } from '../../application/use-cases/create-room/create-room.use-case';
import { DeleteRoomUseCase } from '../../application/use-cases/delete-room/delete-room.use-case';
import { FindRoomByIdUseCase } from '../../application/use-cases/find-room/find-room.use-case';
import { ListRoomsUseCase } from '../../application/use-cases/list-rooms/list-rooms.use-case';
import { RoomPresenter } from '../presenters/room.presenter';

@ApiTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(
    private readonly createRoomUseCase: CreateRoomUseCase,
    private readonly deleteRoomUseCase: DeleteRoomUseCase,
    private readonly findRoomByIdUseCase: FindRoomByIdUseCase,
    private readonly listRoomsUseCase: ListRoomsUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new room' })
  async create(@Body() body: CreateRoomDto) {
    return this.createRoomUseCase.execute(body);
  }

  @Get()
  @ApiOperation({ summary: 'List all rooms (paginated)' })
  async list(@Query('page') page = 1, @Query('limit') limit = 20) {
    const result = await this.listRoomsUseCase.execute({
      page: Number(page),
      limit: Number(limit),
    });

    return {
      ...result,
      data: RoomPresenter.toHttpList(result.data),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a room by ID' })
  async findById(@Param('id') id: string) {
    const room = await this.findRoomByIdUseCase.execute({ id });
    return RoomPresenter.toHttp(room);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a room and its access codes' })
  async delete(@Param('id') id: string) {
    await this.deleteRoomUseCase.execute({ id });
  }
}
