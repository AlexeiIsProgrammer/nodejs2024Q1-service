import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Track, CreateTrackDto } from './interfaces';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    if (!createTrackDto.name || createTrackDto.duration === undefined) {
      throw new BadRequestException('Name and duration are required');
    }
    const newTrack: Track = {
      id: uuid(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: CreateTrackDto): Track {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (index === -1) {
      throw new NotFoundException('Track not found');
    }
    this.tracks[index] = { ...this.tracks[index], ...updateTrackDto };
    return this.tracks[index];
  }

  remove(id: string): void {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (index === -1) {
      throw new NotFoundException('Track not found');
    }
    this.tracks.splice(index, 1);
  }
}
