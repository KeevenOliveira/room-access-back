import { Module } from '@nestjs/common';
import { CreateAccessCodeUseCase } from './application/use-cases/create-access-code/create-access-code.use-case';
import { ListAccessCodesUseCase } from './application/use-cases/list-access-codes/list-access-codes.use-case';
import { RevokeAccessCodeUseCase } from './application/use-cases/revoke-access-code/revoke-access-code.use-case';
import { ValidateAccessUseCase } from './application/use-cases/validate-access/validate-access.use-case';
import { AccessCodeRepository } from './domain/repositories/access-code.repository';
import { AccessCodeController } from './infrastructure/controllers/access-code.controller';
import { PrismaAccessCodeRepository } from './infrastructure/repositories/prisma-access-code.repository';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [RoomsModule],
  controllers: [AccessCodeController],
  providers: [
    { provide: AccessCodeRepository, useClass: PrismaAccessCodeRepository },
    CreateAccessCodeUseCase,
    ListAccessCodesUseCase,
    RevokeAccessCodeUseCase,
    ValidateAccessUseCase,
  ],
})
export class AccessCodesModule {}
