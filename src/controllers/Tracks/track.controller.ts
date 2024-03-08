import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './interfaces';
import { StatusCodes } from 'http-status-codes';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  getById(@Param('id') id: string) {
    return this.trackService.getById(id);
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  update(@Param('id') id: string, @Body() updateTrackDto: CreateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  }
}
