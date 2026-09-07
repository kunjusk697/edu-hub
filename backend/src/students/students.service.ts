import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StudentsService {

  constructor(
    private db: PrismaService
  ) {}

  async list() {

    return this.db.student.findMany({
      include: {
        user: true,

        parent: {
          include: {
            user: true
          }
        },

        enrollments: {
          include: {
            course: {
              include: {
                programme: true
              }
            }
          }
        },

        batches: {
          include: {
            batch: true
          }
        },

        payments: true,

        certificates: true
      },

      orderBy: {
        user: {
          name: 'asc'
        }
      }
    });
  }

  async get(id: string) {

    const student =
      await this.db.student.findUnique({
        where: { id },

        include: {
          user: true,

          parent: {
            include: {
              user: true
            }
          },

          enrollments: {
            include: {
              course: {
                include: {
                  programme: true
                }
              }
            }
          },

          batches: {
            include: {
              batch: true
            }
          },

          attendance: true,
          submissions: true,
          payments: true,
          certificates: true,
          growthDiary: true
        }
      });

    if (!student) {
      throw new NotFoundException(
        'Student not found'
      );
    }

    return student;
  }

  async create(data: {
    name: string;
    email: string;
    phone?: string;
    parentId?: string;
  }) {

    const user =
      await this.db.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          passwordHash: 'TEMPORARY_PASSWORD',
          roles: ['STUDENT']
        }
      });

    return this.db.student.create({
      data: {
        userId: user.id,
        parentId: data.parentId
      },

      include: {
        user: true
      }
    });
  }

  async assignCourse(
    studentId: string,
    courseId: string
  ) {

    return this.db.enrollment.create({
      data: {
        studentId,
        courseId
      }
    });
  }

  async assignBatch(
    studentId: string,
    batchId: string
  ) {

    return this.db.studentBatch.create({
      data: {
        studentId,
        batchId
      }
    });
  }
}
