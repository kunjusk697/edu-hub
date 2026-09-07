import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class MentorsService {

  constructor(
    private db: PrismaService
  ) {}

  list() {

    return this.db.mentor.findMany({

      include: {

        user: true,

        programmes: {
          include: {
            courses: true
          }
        }

      }

    });
  }

  async create(data: any) {

    const user =
      await this.db.user.create({

        data: {

          name: data.name,

          email: data.email,

          phone: data.phone,

          passwordHash:
            'TEMPORARY_PASSWORD',

          roles: ['MENTOR']

        }

      });

    return this.db.mentor.create({

      data: {
        userId: user.id
      },

      include: {
        user: true
      }

    });
  }

  async update(
    id: string,
    data: any
  ) {

    const mentor =
      await this.db.mentor.findUnique({
        where: { id }
      });

    if (!mentor) {
      throw new NotFoundException('Mentor not found');
    }

    await this.db.user.update({
      where: { id: mentor.userId },
      data: {
        name: data.name ?? undefined,
        email: data.email ?? undefined,
        phone: data.phone ?? undefined
      }
    });

    return this.db.mentor.findUnique({
      where: { id },
      include: {
        user: true,
        programmes: {
          include: {
            courses: true
          }
        }
      }
    });
  }
}
