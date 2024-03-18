import { Injectable } from '@nestjs/common';
import { Artist, CreateArtistDto } from './interfaces';
import { DbService } from '../db/db.service';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DbService) {}

  async getAll(): Promise<Artist[]> {
    return this.db.getAllArtists();
  }

  async getById(id: string): Promise<Artist> {
    return this.db.getArtistById(id);
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.db.createArtist(createArtistDto);
  }

  async update(id: string, updateArtistDto: CreateArtistDto): Promise<Artist> {
    return this.db.updateArtist(id, updateArtistDto);
  }

  async delete(id: string): Promise<Artist> {
    return this.db.deleteArtist(id);
  }
}
