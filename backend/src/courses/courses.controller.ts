import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post
} from '@nestjs/common';

import {
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

import { CoursesService } from './courses.service';

class CreateCourseDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  programmeId: string;

  @IsOptional()
  @IsNumber()
  fee?: number;
}

@Controller('courses')
export class CoursesController {
  constructor(private courses: CoursesService) {}

  @Get()
  findAll() {
    return this.courses.findAll();
  }

  @Post()
  create(@Body() data: CreateCourseDto) {
    return this.courses.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courses.remove(id);
  }
}
