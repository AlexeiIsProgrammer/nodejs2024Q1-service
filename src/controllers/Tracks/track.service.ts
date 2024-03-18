import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateTrackDto, Track } from './interfaces';

@Injectable()
export class TrackService {
  constructor(private readonly db: DbService) {}

  async getAll(): Promise<Track[]> {
    return this.db.getAllTracks();
  }

  async getById(id: string): Promise<Track> {
    return this.db.getTrackById(id);
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.db.createTrack(createTrackDto);
  }

  async update(id: string, updateTrackDto: CreateTrackDto): Promise<Track> {
    return this.db.updateTrack(id, updateTrackDto);
  }

  async delete(id: string): Promise<Track> {
    return this.db.deleteTrack(id);
  }
}
