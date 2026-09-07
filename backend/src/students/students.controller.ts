import {
  Body,
  Controller,
  Get,
  Param,
  Post
} from '@nestjs/common';

import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {

  constructor(
    private service: StudentsService
  ) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Get(':id')
  get(
    @Param('id') id: string
  ) {
    return this.service.get(id);
  }

  @Post()
  create(
    @Body() body: any
  ) {
    return this.service.create(body);
  }

  @Post(':id/courses/:courseId')
  assignCourse(
    @Param('id') studentId: string,
    @Param('courseId') courseId: string
  ) {
    return this.service.assignCourse(
      studentId,
      courseId
    );
  }

  @Post(':id/batches/:batchId')
  assignBatch(
    @Param('id') studentId: string,
    @Param('batchId') batchId: string
  ) {
    return this.service.assignBatch(
      studentId,
      batchId
    );
  }
}
