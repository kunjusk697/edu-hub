import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ProgrammesModule } from './programmes/programmes.module';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import { PaymentsModule } from './payments/payments.module';
import { BatchesModule } from './batches/batches.module';
import { MentorsModule } from './mentors/mentors.module';
import { ParentsModule } from './parents/parents.module';

@Module({

  imports: [

    AuthModule,

    ProgrammesModule,

    CoursesModule,

    StudentsModule,

    PaymentsModule,

    BatchesModule,

    MentorsModule,

    ParentsModule

  ]

})

export class AppModule {}
