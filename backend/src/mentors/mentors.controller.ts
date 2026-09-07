import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';

import { MentorsService } from './mentors.service';

@Controller('mentors')
export class MentorsController {

  constructor(
    private service: MentorsService
  ) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post()
  create(
    @Body() body: any
  ) {
    return this.service.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: any
  ) {
    return this.service.update(
      id,
      body
    );
  }
}
