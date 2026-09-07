import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';

import { BatchesService } from './batches.service';

@Controller('batches')
export class BatchesController {

  constructor(
    private service: BatchesService
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

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.service.remove(id);
  }
}
