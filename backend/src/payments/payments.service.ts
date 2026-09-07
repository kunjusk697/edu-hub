import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private db: PrismaService) {}

  findAll() {
    return this.db.payment.findMany({
      include: { student: { include: { user: true } } },
      orderBy: { dueDate: 'desc' }
    });
  }
}
