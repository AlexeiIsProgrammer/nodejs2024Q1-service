import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateTrackDto, Track } from './interfaces';

@Injectable()
export class TrackService {
  constructor(private readonly db: DbService) {}

  getAll(): Track[] {
    return this.db.getAllTracks();
  }

  getById(id: string): Track {
    return this.db.getTrackById(id);
  }

  create(createTrackDto: CreateTrackDto): Track {
    return this.db.createTrack(createTrackDto);
  }

  update(id: string, updateTrackDto: CreateTrackDto): Track {
    return this.db.updateTrack(id, updateTrackDto);
  }

  delete(id: string): void {
    return this.db.deleteTrack(id);
  }
}
