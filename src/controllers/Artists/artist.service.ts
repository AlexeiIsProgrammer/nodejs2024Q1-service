import { Injectable } from '@nestjs/common';
import { Artist, CreateArtistDto } from './interfaces';
import { DbService } from '../db/db.service';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DbService) {}

  getAll(): Artist[] {
    return this.db.getAllArtists();
  }

  getById(id: string): Artist {
    return this.db.getArtistById(id);
  }

  create(createArtistDto: CreateArtistDto): Artist {
    return this.db.createArtist(createArtistDto);
  }

  update(id: string, updateArtistDto: CreateArtistDto): Artist {
    return this.db.updateArtist(id, updateArtistDto);
  }

  delete(id: string): void {
    return this.db.deleteArtist(id);
  }
}
