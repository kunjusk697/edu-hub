import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class ParentsService {

  constructor(
    private db: PrismaService
  ) {}

  list() {

    return this.db.parent.findMany({
      include: {
        user: true,
        children: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        user: {
          name: 'asc'
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
          passwordHash: 'TEMPORARY_PASSWORD',
          roles: ['PARENT']
        }
      });

    return this.db.parent.create({
      data: {
        userId: user.id
      },
      include: {
        user: true,
        children: true
      }
    });
  }

  async update(
    id: string,
    data: any
  ) {

    const parent =
      await this.db.parent.findUnique({
        where: { id }
      });

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    await this.db.user.update({
      where: { id: parent.userId },
      data: {
        name: data.name ?? undefined,
        email: data.email ?? undefined,
        phone: data.phone ?? undefined
      }
    });

    return this.db.parent.findUnique({
      where: { id },
      include: {
        user: true,
        children: {
          include: {
            user: true
          }
        }
      }
    });
  }
}
