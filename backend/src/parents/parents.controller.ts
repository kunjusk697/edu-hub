import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';

import { ParentsService } from './parents.service';

@Controller('parents')
export class ParentsController {

  constructor(
    private service: ParentsService
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
