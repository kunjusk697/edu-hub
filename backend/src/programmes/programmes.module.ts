import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { ProgrammesController } from './programmes.controller';
import { ProgrammesService } from './programmes.service';

@Module({
  controllers: [ProgrammesController],
  providers: [ProgrammesService, PrismaService]
})
export class ProgrammesModule {}
