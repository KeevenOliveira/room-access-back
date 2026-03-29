import { ConflictError } from '@core/domain/errors/domain.error';
import { Room } from '../../../domain/entities/room.entity';
import { RoomName } from '../../../domain/value-objects/room-name.vo';
import { InMemoryRoomRepository } from '../../../infrastructure/repositories/in-memory-room.repository';
import { CreateRoomUseCase } from './create-room.use-case';

describe('CreateRoomUseCase', () => {
  let sut: CreateRoomUseCase;
  let repository: InMemoryRoomRepository;

  beforeEach(() => {
    repository = new InMemoryRoomRepository();
    sut = new CreateRoomUseCase(repository);
  });

  it('should create a room successfully', async () => {
    const output = await sut.execute({ name: 'Server Room', description: 'Main server' });

    expect(output.id).toBeDefined();
    expect(repository.items).toHaveLength(1);
    expect(repository.items[0].name.value).toBe('Server Room');
  });

  it('should throw ConflictError when room name already exists', async () => {
    const existing = Room.create({ name: RoomName.create('Server Room') });
    repository.items.push(existing);

    await expect(sut.execute({ name: 'Server Room' })).rejects.toThrow(ConflictError);
  });

  it('should throw when room name is too short', async () => {
    await expect(sut.execute({ name: 'A' })).rejects.toThrow();
  });
});
