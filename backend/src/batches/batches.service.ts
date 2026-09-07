import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class BatchesService {

  constructor(
    private db: PrismaService
  ) {}

  list() {

    return this.db.batch.findMany({
      include: {
        students: {
          include: {
            student: {
              include: {
                user: true
              }
            }
          }
        }
      },

      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  get(id: string) {

    return this.db.batch.findUnique({
      where: { id },

      include: {
        students: {
          include: {
            student: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });
  }

  create(data: any) {

    return this.db.batch.create({
      data
    });
  }

  update(
    id: string,
    data: any
  ) {

    return this.db.batch.update({
      where: { id },
      data
    });
  }

  remove(id: string) {

    return this.db.batch.delete({
      where: { id }
    });
  }
}
