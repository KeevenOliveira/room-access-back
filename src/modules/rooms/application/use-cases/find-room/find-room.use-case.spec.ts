import { NotFoundError } from '@core/domain/errors/domain.error';
import { Room } from '../../../domain/entities/room.entity';
import { RoomName } from '../../../domain/value-objects/room-name.vo';
import { InMemoryRoomRepository } from '../../../infrastructure/repositories/in-memory-room.repository';
import { UniqueEntityId } from '@core/domain/value-objects/unique-entity-id.vo';
import { FindRoomByIdUseCase } from './find-room.use-case';

describe('FindRoomByIdUseCase', () => {
  let sut: FindRoomByIdUseCase;
  let repository: InMemoryRoomRepository;

  beforeEach(() => {
    repository = new InMemoryRoomRepository();
    sut = new FindRoomByIdUseCase(repository);
  });

  it('should return a room when found', async () => {
    const id = new UniqueEntityId('some-uuid');
    const room = Room.create({ name: RoomName.create('Lab') }, id);
    repository.items.push(room);

    const result = await sut.execute({ id: 'some-uuid' });

    expect(result.id.value).toBe('some-uuid');
    expect(result.name.value).toBe('Lab');
  });

  it('should throw NotFoundError when room does not exist', async () => {
    await expect(sut.execute({ id: 'non-existent' })).rejects.toThrow(NotFoundError);
  });
});
