import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/infrastructure/database/prisma.service';
import type { AccessCode } from '../../domain/entities/access-code.entity';
import { AccessCodeRepository } from '../../domain/repositories/access-code.repository';
import { AccessCodeMapper } from '../mappers/access-code.mapper';

@Injectable()
export class PrismaAccessCodeRepository extends AccessCodeRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findById(id: string): Promise<AccessCode | null> {
    const row = await this.prisma.accessCode.findUnique({ where: { id } });
    return row ? AccessCodeMapper.toDomain(row) : null;
  }

  async findByCode(code: string): Promise<AccessCode | null> {
    const row = await this.prisma.accessCode.findUnique({ where: { code } });
    return row ? AccessCodeMapper.toDomain(row) : null;
  }

  async findByRoomId(roomId: string): Promise<AccessCode[]> {
    const rows = await this.prisma.accessCode.findMany({
      where: { roomId },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(AccessCodeMapper.toDomain);
  }

  async findByNicknameAndRoomId(nickname: string, roomId: string): Promise<AccessCode | null> {
    const row = await this.prisma.accessCode.findFirst({
      where: { nickname, roomId, isActive: true },
    });
    return row ? AccessCodeMapper.toDomain(row) : null;
  }

  async countActiveByRoomId(roomId: string): Promise<number> {
    return this.prisma.accessCode.count({ where: { roomId, isActive: true } });
  }

  async save(accessCode: AccessCode): Promise<void> {
    const data = AccessCodeMapper.toPersistence(accessCode);

    await this.prisma.accessCode.upsert({
      where: { id: data.id },
      create: data,
      update: {
        nickname: data.nickname,
        isActive: data.isActive,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.accessCode.delete({ where: { id } });
  }
}
