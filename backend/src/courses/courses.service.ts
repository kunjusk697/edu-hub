import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CoursesService {
  constructor(private db: PrismaService) {}

  findAll() {
    return this.db.course.findMany({
      include: {
        programme: {
          include: { mentor: { include: { user: true } } }
        },
        modules: true,
        enrollments: true
      },
      orderBy: { title: 'asc' }
    });
  }

  findOne(id: string) {
    return this.db.course.findUnique({
      where: { id },
      include: {
        programme: {
          include: { mentor: { include: { user: true } } }
        },
        modules: {
          include: {
            sessions: true
          }
        },
        enrollments: true
      }
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
