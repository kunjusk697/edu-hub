import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post
} from '@nestjs/common';

import { IsOptional, IsString } from 'class-validator';

import { ProgrammesService } from './programmes.service';

class CreateProgrammeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

@Controller('programmes')
export class ProgrammesController {
  constructor(private programmes: ProgrammesService) {}

  @Get()
  findAll() {
    return this.programmes.findAll();
  }

  @Post()
  create(@Body() data: CreateProgrammeDto) {
    return this.programmes.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programmes.remove(id);
  }
}
