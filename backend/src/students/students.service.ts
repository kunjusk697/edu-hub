import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class StudentsService {
  constructor(private db: PrismaService) {}

  findAll() {
    return this.db.student.findMany({
      include: {
        user: true,
        enrollments: true
      }
    });
  }
}
