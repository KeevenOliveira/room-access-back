import { Injectable } from '@nestjs/common';
import type { UseCase } from '@core/application/use-case.interface';
import { NotFoundError } from '@core/domain/errors/domain.error';
import { AccessCodeRepository } from '../../../domain/repositories/access-code.repository';

export interface RevokeAccessCodeInput {
  id: string;
}

@Injectable()
export class RevokeAccessCodeUseCase implements UseCase<RevokeAccessCodeInput, void> {
  constructor(private readonly accessCodeRepository: AccessCodeRepository) {}

  async execute(input: RevokeAccessCodeInput): Promise<void> {
    const accessCode = await this.accessCodeRepository.findById(input.id);
    if (!accessCode) {
      throw new NotFoundError('AccessCode', input.id);
    }

    accessCode.revoke();
    await this.accessCodeRepository.save(accessCode);
  }
}
