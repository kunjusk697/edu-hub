import { Module } from '@nestjs/common';

import { MentorsController } from './mentors.controller';
import { MentorsService } from './mentors.service';

import { PrismaService } from '../prisma.service';

@Module({
  controllers: [
    MentorsController
  ],

  providers: [
    MentorsService,
    PrismaService
  ]
})
export class MentorsModule {}
