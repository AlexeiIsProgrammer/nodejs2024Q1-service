import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { FavoritesResponse } from './interfaces';
import { Track } from '../Tracks/interfaces';
import { Album } from '../Albums/interfaces';
import { Artist } from '../Artists/interfaces';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DbService) {}

  async getAll(): Promise<FavoritesResponse> {
    return this.db.getAllFavorites();
  }

  async addToFavoritesTrack(id: string): Promise<Track> {
    return this.db.addToFavoritesTrack(id);
  }

  async removeFromFavoritesTrack(id: string): Promise<Track> {
    return this.db.removeFromFavoritesTrack(id);
  }

  async addToFavoritesAlbum(id: string): Promise<Album> {
    return this.db.addToFavoritesAlbum(id);
  }

  async removeFromFavoritesAlbum(id: string): Promise<Album> {
    return this.db.removeFromFavoritesAlbum(id);
  }

  async addToFavoritesArtist(id: string): Promise<Artist> {
    return this.db.addToFavoritesArtist(id);
  }

  async removeFromFavoritesArtist(id: string): Promise<Artist> {
    return this.db.removeFromFavoritesArtist(id);
  }
}
