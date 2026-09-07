import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CoursesService {
  constructor(private db: PrismaService) {}

  findAll() {
    return this.db.course.findMany({
      include: {
        programme: true,
        modules: true
      },
      orderBy: { title: 'asc' }
    });
  }

  create(data: {
    title: string;
    description?: string;
    programmeId: string;
    fee?: number;
  }) {
    return this.db.course.create({
      data: {
        title: data.title,
        description: data.description,
        programmeId: data.programmeId,
        fee: data.fee ?? 0
      },
      include: {
        programme: true,
        modules: true
      }
    });
  }

  remove(id: string) {
    return this.db.course.delete({ where: { id } });
  }
}
