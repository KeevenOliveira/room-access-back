import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { FastifyReply } from 'fastify';
import { CreateAccessCodeDto } from '../../application/use-cases/create-access-code/create-access-code.dto';
import { CreateAccessCodeUseCase } from '../../application/use-cases/create-access-code/create-access-code.use-case';
import { ListAccessCodesUseCase } from '../../application/use-cases/list-access-codes/list-access-codes.use-case';
import { RevokeAccessCodeUseCase } from '../../application/use-cases/revoke-access-code/revoke-access-code.use-case';
import { ValidateAccessDto } from '../../application/use-cases/validate-access/validate-access.dto';
import { ValidateAccessUseCase } from '../../application/use-cases/validate-access/validate-access.use-case';
import { AccessCodePresenter } from '../presenters/access-code.presenter';

@ApiTags('access-codes')
@Controller()
export class AccessCodeController {
  constructor(
    private readonly createAccessCodeUseCase: CreateAccessCodeUseCase,
    private readonly listAccessCodesUseCase: ListAccessCodesUseCase,
    private readonly revokeAccessCodeUseCase: RevokeAccessCodeUseCase,
    private readonly validateAccessUseCase: ValidateAccessUseCase,
  ) {}

  @Post('rooms/:roomId/codes')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new access code for a room' })
  async create(@Param('roomId') roomId: string, @Body() body: Omit<CreateAccessCodeDto, 'roomId'>) {
    return this.createAccessCodeUseCase.execute({ ...body, roomId });
  }

  @Get('rooms/:roomId/codes')
  @ApiOperation({ summary: 'List all access codes for a room' })
  async list(@Param('roomId') roomId: string) {
    const codes = await this.listAccessCodesUseCase.execute({ roomId });
    return AccessCodePresenter.toHttpList(codes);
  }

  @Delete('rooms/:roomId/codes/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revoke an access code' })
  async revoke(@Param('id') id: string) {
    await this.revokeAccessCodeUseCase.execute({ id });
  }

  @Post('access/validate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validate room access with a code' })
  async validate(@Body() body: ValidateAccessDto, @Res() reply: FastifyReply) {
    const result = await this.validateAccessUseCase.execute(body);

    if (result.granted) {
      return reply.status(HttpStatus.OK).send(result);
    }

    return reply.status(HttpStatus.UNAUTHORIZED).send(result);
  }
}
