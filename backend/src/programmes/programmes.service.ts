import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class ProgrammesService {
  constructor(private db: PrismaService) {}

  findAll() {
    return this.db.programme.findMany({
      include: { courses: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  create(data: { name: string; description?: string }) {
    return this.db.programme.create({
      data: {
        name: data.name,
        description: data.description
      },
      include: { courses: true }
    });
  }

  remove(id: string) {
    return this.db.programme.delete({ where: { id } });
  }
}
